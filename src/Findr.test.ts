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
  test('map to elem prop', async () => {
    setupDom();
    const barText = await $('.outer .bar').evalWithResult((e) => e.textContent);
    expect(barText).toEqual('tower');
  });
  test('eval await style', async () => {
    setupDom();
    return await $('.outer').eval();
  });
  test('exception in where', (done) => {
    assertTimeout(
      done,
      $('.outer').where(() => {
        throw 'yalla';
      }),
    );
  });
  test('exception in evalWithResult', (done) => {
    $('.outer')
      .evalWithResult(() => {
        throw 'yalla';
      })
      .then(() => {
        done('should have timed out');
      })
      .catch(() => {
        done();
      });
  });
});
