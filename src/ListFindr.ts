import { Findr } from './Findr';

export class ListFindr {
  constructor(
    private readonly findr: Findr,
    private readonly selector: string,
    private readonly _count: number = -1,
  ) {}

  count(expected: number): ListFindr {
    return new ListFindr(this.findr, this.selector, expected);
  }

  async eval(): Promise<any> {
    return this.evalWithResult((e) => true);
  }

  async evalWithResult<T>(f: (e: NodeListOf<Element>) => T | null): Promise<T> {
    const startTime = new Date().getTime();
    return new Promise<T>((resolve, reject) => {
      const doEval = () => {
        const elapsed = new Date().getTime() - startTime;
        if (elapsed > this.findr.getTimeout()) {
          reject('timed out');
        } else {
          const findrElem = this.findr.evalSync();
          if (findrElem === null) {
            //console.log('parent findr didn not return element');
            setTimeout(doEval, 100); // TODO configure
          } else {
            const elems = findrElem.querySelectorAll(this.selector);
            if (this._count !== -1 && this._count !== elems.length) {
              reject(
                'invalid count, expected ' +
                  this._count +
                  ', got ' +
                  elems.length,
              );
            } else {
              const res = f(elems);
              if (res === null) {
                setTimeout(doEval, 100); // TODO configure
              } else {
                resolve(res);
              }
            }
          }
        }
      };
      doEval();
    });
  }
}
