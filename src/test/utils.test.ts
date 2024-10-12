import { Findr } from '../Findr';
import { ListFindr } from '../ListFindr';

export function assertEval(done: jest.DoneCallback, f: Findr | ListFindr) {
  f.eval()
    .then(() => {
      done();
    })
    .catch(() => {
      done('timed out');
    });
}

export function assertTimeout(done: jest.DoneCallback, f: Findr | ListFindr) {
  f.eval()
    .then(() => {
      done('should time out');
    })
    .catch(() => {
      done();
    });
}

export function setupDom() {
  document.body.innerHTML = `
<div class="outer">
  <span id="username" />
  <span id="password" />
  <button id="doit" />
  <div class="foo">
    <div class="bar">tower</div>
    <div class="bar">of</div>
    <div class="bar">power</div>
  </div>
</div>`;
}

export const f = Findr.ROOT.setTimeout(1000);
export const $ = f.$.bind(f);
export const $$ = f.$$.bind(f);
