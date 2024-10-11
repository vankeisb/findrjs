export type SinglePredicate = (e: Element) => boolean;

abstract class FindrItem {
  abstract execute(context: Element): Element | null;
}

class ElemItem extends FindrItem {
  constructor(readonly selector: string) {
    super();
  }

  execute(context: Element): Element | null {
    return context.querySelector(this.selector);
  }
}

class WhereItem extends FindrItem {
  constructor(readonly where: SinglePredicate) {
    super();
  }

  execute(context: Element): Element | null {
    if (this.where(context)) {
      return context;
    } else {
      return null;
    }
  }
}

export class Findr {
  static ROOT = new Findr(() => document.documentElement, 5000, []);

  private constructor(
    readonly context: () => Element,
    readonly timeoutMs: number,
    readonly items: readonly FindrItem[],
  ) {}

  element(selector: string): Findr {
    return new Findr(this.context, this.timeoutMs, [
      ...this.items,
      new ElemItem(selector),
    ]);
  }

  where(f: SinglePredicate): Findr {
    return new Findr(this.context, this.timeoutMs, [
      ...this.items,
      new WhereItem(f),
    ]);
  }

  async eval(): Promise<any> {
    return this.evalWithResult((e) => true);
  }

  async evalWithResult<T>(f: (e: Element) => T | undefined): Promise<T> {
    console.log('eval');
    const startTime = new Date().getTime();
    return new Promise<T>((resolve, reject) => {
      const doEval = () => {
        const elapsed = new Date().getTime() - startTime;
        if (elapsed > this.timeoutMs) {
          reject('timed out');
        } else {
          let context: Element | null = this.context();
          for (let item of this.items) {
            context = item.execute(context);
            if (context === null) {
              console.log('stopped while searching, item', item);
              break;
            }
          }
          if (context === null) {
            console.log('retrying');
            setTimeout(() => {
              doEval();
            }, 100); // TODO configure
          } else {
            const res = f(context);
            if (res === undefined) {
              console.log('retrying (eval callback failed)');
              setTimeout(() => {
                doEval();
              }, 100); // TODO configure
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
