import { FindrItem } from './FindrItem';
import type { SinglePredicate } from './SinglePredicate';

export class WhereItem extends FindrItem {
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

  describe(): string {
    const desc = this.where.description ?? 'no description available';
    return 'where : ' + desc;
  }
}
