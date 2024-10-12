import { $$, assertEval, setupDom, assertTimeout } from './test/utils.test';

describe('ListFindr tests', () => {
  test('simple dom', (done) => {
    setupDom();
    assertEval(done, $$('span'));
  });
  test('simple count', (done) => {
    setupDom();
    assertEval(done, $$('span').count(2));
  });
  test('simple count timeout', (done) => {
    setupDom();
    assertTimeout(
      done,
      $$('span').count(33),
      'invalid count, expected 33, got 2',
    );
  });
});
