import { $, $$, assertEval, setupDom, assertTimeout } from './test/utils.test';

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
    assertTimeout(done, $$('span').count(33));
  });
  test('at', (done) => {
    setupDom();
    assertEval(
      done,
      $$('span')
        .at(1)
        .where((e) => e.id === 'password'),
    );
  }, 60000);
  test('at failed', (done) => {
    setupDom();
    assertTimeout(done, $$('span').at(123));
  });
  test('multiple list', (done) => {
    setupDom();
    assertEval(
      done,
      $('.outer')
        .$$('.foo')
        .count(1)
        .at(0)
        .$$('.bar')
        .at(2)
        .where((e) => e.textContent === 'power'),
    );
  });
});
