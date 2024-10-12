import { Findr } from './Findr';
import { SinglePredicate } from './SinglePredicate';
import { WhereItem } from './WhereItem';

export class ListFindr {
  static newInstance(findr: Findr, selector: string): ListFindr {
    return new ListFindr(findr, selector, -1, []);
  }

  private constructor(
    private readonly findr: Findr,
    private readonly selector: string,
    private readonly _count: number,
    private readonly whereItems: readonly SinglePredicate[],
  ) {}

  count(expected: number): ListFindr {
    return new ListFindr(this.findr, this.selector, expected, this.whereItems);
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
            return elems[index];
          }
        }
      },
      this.findr.getTimeout(),
      [],
    );
  }

  where(p: SinglePredicate): ListFindr {
    return new ListFindr(this.findr, this.selector, this._count, [
      ...this.whereItems,
      p,
    ]);
  }

  expectOne(): Findr {
    return this.count(1).at(0);
  }

  private evalSync(): readonly Element[] | null {
    const findrElem = this.findr.evalSync();
    if (findrElem === null) {
      return null;
    }
    const elems = Array.from(findrElem.querySelectorAll(this.selector)).filter(
      (e) => {
        for (let p of this.whereItems) {
          if (!p(e)) {
            return false;
          }
        }
        return true;
      },
    );
    if (this._count !== -1 && this._count !== elems.length) {
      return null;
    }
    return elems;
  }

  async eval(): Promise<any> {
    return this.evalWithResult((e) => true);
  }

  async evalWithResult<T>(f: (e: readonly Element[]) => T | null): Promise<T> {
    const startTime = new Date().getTime();
    return new Promise<T>((resolve, reject) => {
      const doEval = () => {
        const elapsed = new Date().getTime() - startTime;
        if (elapsed > this.findr.getTimeout()) {
          reject();
        } else {
          const elems = this.evalSync();
          if (elems === null) {
            setTimeout(doEval, 100); // TODO configure
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
