type Runnable = () => void;

export class Retry {
  constructor(
    readonly attempts: number = 10,
    readonly steps: readonly Runnable[] = [],
  ) {}

  add(step: Runnable): Retry {
    return new Retry(this.attempts, [...this.steps, step]);
  }

  //   eval(): Promise<any> {}
}
