export abstract class FindrItem {
  abstract execute(context: Element): Element | null;
}
