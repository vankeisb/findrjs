import { Findr } from '../Findr';
import { ListFindr } from '../ListFindr';

export function assertEval(done: jest.DoneCallback, f: Findr | ListFindr) {
  f.eval()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
}

export function assertTimeout(
  done: jest.DoneCallback,
  f: Findr | ListFindr,
  message?: string,
) {
  f.eval()
    .then(() => done('should have timed out'))
    .catch((err) => {
      expect(err).toEqual(message ?? 'timed out');
      done();
    });
}

export function setupDom() {
  document.body.innerHTML =
    '<div class="outer">' +
    '  <span id="username" />' +
    '  <span id="password" />' +
    '  <button id="doit" />' +
    '</div>';
}

export const f = Findr.ROOT.setTimeout(1000);
export const $ = f.$.bind(f);
export const $$ = f.$$.bind(f);
