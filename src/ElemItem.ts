import { FindrItem } from './FindrItem';

export class ElemItem extends FindrItem {
  constructor(readonly selector: string) {
    super();
  }

  execute(context: Element): Element | null {
    return context.querySelector(this.selector);
  }

  describe(): string {
    return this.selector;
  }
}
