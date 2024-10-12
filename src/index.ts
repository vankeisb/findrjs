import { LOG } from './Logger';

export * from './Findr';
export * from './ListFindr';
export function enableLogging(enabled: boolean): void {
  LOG.enabled = enabled;
}
