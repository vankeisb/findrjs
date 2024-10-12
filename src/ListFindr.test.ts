import { Findr } from './Findr';
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
  test('where', (done) => {
    setupDom();
    assertEval(
      done,
      $('.outer')
        .$$('.bar')
        .where((e) => e.textContent === 'of')
        .count(1),
    );
  });
  test('where timeout', (done) => {
    setupDom();
    assertTimeout(
      done,
      $('.outer')
        .$$('.bar')
        .where((e) => e.textContent === 'yalla')
        .count(1),
    );
  });
  test('where no count', (done) => {
    setupDom();
    assertEval(
      done,
      $('.outer')
        .$$('.bar')
        .where((e) => e.textContent === 'yalla'),
    );
  });
  test('where with result', async () => {
    setupDom();
    const textContent = await $('.outer')
      .$$('div')
      .where((e) => e.textContent === 'tower')
      .count(1)
      .at(0)
      .evalWithResult((e) => e.textContent);
    expect(textContent).toBe('tower');
  });
  test('async update', (done) => {
    document.body.innerHTML = '<div>Loading...</div>';
    setTimeout(setupDom, 3000);
    Findr.ROOT.setTimeout(5000)
      .$('.outer')
      .$$('div.bar')
      .count(3)
      .eval()
      .then(() => {
        done();
      })
      .catch(() => {
        done('timed out');
      });
  }, 10000);
  test('async update 2', (done) => {
    document.body.innerHTML = '<div>Loading...</div>';
    setTimeout(setupDom, 3000);
    Findr.ROOT.setTimeout(5000)
      .$('.outer')
      .$$('div')
      .where((e) => e.classList.contains('bar'))
      .count(3)
      .at(0)
      .where((e) => e.textContent === 'tower')
      .eval()
      .then(() => {
        done();
      })
      .catch(() => {
        done('timed out');
      });
  }, 10000);
  test('async update 3', (done) => {
    document.body.innerHTML = '<div>Loading...</div>';
    setTimeout(setupDom, 3000);
    Findr.ROOT.setTimeout(5000)
      .$$('div')
      .where((e) => e.classList.contains('bar'))
      .count(3)
      .at(0)
      .where((e) => e.textContent === 'tower')
      .eval()
      .then(() => {
        done();
      })
      .catch(() => {
        done('timed out');
      });
  }, 10000);
});
