import { ElemItem } from './ElemItem';
import type { FindrItem } from './FindrItem';
import { ListFindr } from './ListFindr';
import { LOG, Logger } from './Logger';
import type { SinglePredicate } from './SinglePredicate';
import { WhereItem } from './WhereItem';

export class Findr {
  static ROOT = new Findr(() => document.documentElement, 5000, []);

  constructor(
    private readonly context: () => Element | null,
    private readonly timeoutMs: number,
    private readonly items: readonly FindrItem[],
  ) {}

  static enableLogging(enabled: boolean) {
    LOG.enabled = enabled;
  }

  setTimeout(timeoutMs: number): Findr {
    return new Findr(this.context, timeoutMs, this.items);
  }

  getTimeout(): number {
    return this.timeoutMs;
  }

  $(selector: string): Findr {
    return new Findr(this.context, this.timeoutMs, [
      ...this.items,
      new ElemItem(selector),
    ]);
  }

  $$(selector: string): ListFindr {
    return ListFindr.newInstance(this, selector);
  }

  where(f: SinglePredicate): Findr {
    return new Findr(this.context, this.timeoutMs, [
      ...this.items,
      new WhereItem(f),
    ]);
  }

  evalSync(): Element | null {
    let context: Element | null = this.context();
    if (context === null) {
      LOG.warn('> parent context returned null');
      return null;
    }
    for (const item of this.items) {
      context = item.execute(context);
      if (context === null) {
        LOG.warn('> failed : ' + item.describe());
        break;
      } else {
        LOG.success('> ok : ' + item.describe());
      }
    }
    return context;
  }

  async eval(): Promise<any> {
    return this.evalWithResult((e) => true);
  }

  async evalWithResult<T>(f: (e: Element) => T | null): Promise<T> {
    const startTime = new Date().getTime();
    LOG.info('eval starting at ' + startTime);
    return new Promise<T>((resolve, reject) => {
      const doEval = () => {
        const elapsed = new Date().getTime() - startTime;
        if (elapsed > this.timeoutMs) {
          LOG.error('timed out');
          reject('timed out');
        } else {
          let context: Element | null = this.context();
          if (context === null) {
            LOG.warn('retrying eval...');
            setTimeout(doEval, 100); // TODO configure
          } else {
            for (const item of this.items) {
              context = item.execute(context);
              if (context === null) {
                LOG.warn('> failed : ' + item.describe());
                break;
              } else {
                LOG.success('> ok : ' + item.describe());
              }
            }
            if (context === null) {
              LOG.warn('no elem, retrying eval...');
              setTimeout(doEval, 100); // TODO configure
            } else {
              const res = f(context);
              if (res === null) {
                LOG.warn('callback returned null, retrying eval...');
                setTimeout(doEval, 100); // TODO configure
              } else {
                LOG.success('eval success, resolving');
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
