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

  at(index: number): Findr {
    return new Findr(
      () => {
        const elems = this.evalSync();
        if (elems === null) {
          return null;
        } else {
          if (index > elems.length - 1) {
            return null;
          } else {
            return elems.item(index);
          }
        }
      },
      this.findr.getTimeout(),
      [],
    );
  }

  private evalSync(): NodeListOf<Element> | null {
    const findrElem = this.findr.evalSync();
    if (findrElem === null) {
      return null;
    }
    const elems = findrElem.querySelectorAll(this.selector);
    if (this._count !== -1 && this._count !== elems.length) {
      return null;
    }
    return elems;
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
          reject();
        } else {
          const elems = this.evalSync();
          if (elems === null) {
            reject();
          } else {
            const res = f(elems);
            if (res === null) {
              setTimeout(doEval, 100); // TODO configure
            } else {
              resolve(res);
            }
          }
        }
      };
      doEval();
    });
  }
}
