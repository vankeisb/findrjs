import { FindrItem } from './FindrItem';
import { SinglePredicate } from './SinglePredicate';

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
}
