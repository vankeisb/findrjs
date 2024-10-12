import { Findr } from './Findr';
import { LOG } from './Logger';
import type { SinglePredicate } from './SinglePredicate';

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
          LOG.warn('> parent context returned null');
          return null;
        } else {
          if (index > elems.length - 1) {
            LOG.warn('> at(' + index + ' out of bounds : ' + elems.length);
            return null;
          } else {
            LOG.success('> at(' + index + ') found');
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
      LOG.warn('> parent context returned null');
      return null;
    }
    const elems = Array.from(findrElem.querySelectorAll(this.selector)).filter(
      (e) => {
        for (const p of this.whereItems) {
          if (!p(e)) {
            LOG.warn('> failed : ' + (p.description ?? ' (no description)'));
            return false;
          } else {
            LOG.success('> ok : ' + (p.description ?? ' (no description)'));
          }
        }
        return true;
      },
    );
    if (this._count !== -1 && this._count !== elems.length) {
      LOG.warn('> failed : count(' + this._count + '), was ' + elems.length);
      return null;
    }
    return elems;
  }

  async eval(): Promise<void> {
    return this.evalWithResult(() => true).then(() => {});
  }

  async evalWithResult<T>(f: (e: readonly Element[]) => T | null): Promise<T> {
    const startTime = new Date().getTime();
    LOG.info('eval starting at ' + startTime);
    return new Promise<T>((resolve, reject) => {
      const doEval = () => {
        const elapsed = new Date().getTime() - startTime;
        if (elapsed > this.findr.getTimeout()) {
          LOG.error('timed out');
          reject('timed out');
        } else {
          const elems = this.evalSync();
          if (elems === null) {
            LOG.warn('no elems, retrying eval...');
            setTimeout(doEval, 100); // TODO configure
          } else {
            const res = f(elems);
            if (res === null) {
              LOG.warn('callback returned null, retrying eval...');
              setTimeout(doEval, 100); // TODO configure
            } else {
              LOG.success('eval success, resolving');
              resolve(res);
            }
          }
        }
      };
      doEval();
    });
  }
}
