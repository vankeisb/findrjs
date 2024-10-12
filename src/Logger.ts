export class Logger {
  enabled: boolean = false;

  info(message: string): void {
    if (this.enabled) {
      console.log(message);
    }
  }

  warn(message: string): void {
    if (this.enabled) {
      console.log('%c' + message, 'color: orange;');
    }
  }

  success(message: string): void {
    if (this.enabled) {
      console.log('%c' + message, 'color: green;');
    }
  }

  error(message: string): void {
    if (this.enabled) {
      console.log('%c' + message, 'color: red;');
    }
  }
}

export const LOG: Logger = new Logger();
