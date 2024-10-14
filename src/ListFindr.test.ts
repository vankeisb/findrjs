import { Findr } from './Findr';
import { hasClass, id, textEquals } from './SinglePredicate';
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
    assertEval(done, $$('span').at(1).where(id('password')));
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
        .where(textEquals('power')),
    );
  });
  test('where', (done) => {
    setupDom();
    assertEval(done, $('.outer').$$('.bar').where(textEquals('of')).count(1));
  });
  test('where timeout', (done) => {
    setupDom();
    assertTimeout(
      done,
      $('.outer').$$('.bar').where(textEquals('yalla')).count(1),
    );
  });
  test('where no count', (done) => {
    setupDom();
    assertEval(done, $('.outer').$$('.bar').where(textEquals('yalla')));
  });
  test('where with result', async () => {
    setupDom();
    const textContent = await $('.outer')
      .$$('div')
      .where(textEquals('tower'))
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
      .where(hasClass('bar'))
      .count(3)
      .at(0)
      .where(textEquals('tower'))
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
      .where(hasClass('bar'))
      .count(3)
      .at(0)
      .where(textEquals('tower'))
      .eval()
      .then(() => {
        done();
      })
      .catch(() => {
        done('timed out');
      });
  }, 10000);
});
