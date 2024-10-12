import { Findr } from './Findr';
import { $, assertEval, assertTimeout, setupDom } from './test/utils.test';

describe('Findr tests', () => {
  test('simple dom', (done) => {
    setupDom();
    assertEval(done, $('#username'));
  });
  test('timeout', (done) => {
    setupDom();
    assertTimeout(done, $('#yalla'));
  });
  test('dom update async', (done) => {
    document.body.innerHTML = '<div>yalla</div>';
    setTimeout(() => {
      setupDom();
    }, 3000);
    assertEval(done, Findr.ROOT.$('#username'));
  });
  test('multiple elements', (done) => {
    setupDom();
    assertEval(done, $('.outer').$('button'));
  });
  test('multiple elements failed', (done) => {
    setupDom();
    assertTimeout(done, $('.outer').$('svg'));
  });
  test('multiple elements where ok', (done) => {
    setupDom();
    assertEval(
      done,
      $('.outer')
        .where((e) => e.classList.contains('outer'))
        .$('button')
        .where((e) => e.id === 'doit'),
    );
  });
  test('multiple elements where failed', (done) => {
    setupDom();
    assertTimeout(
      done,
      $('.outer')
        .where((e) => e.classList.contains('outer'))
        .$('button')
        .where((e) => {
          return e.id === 'yalla';
        }),
    );
  });
});
