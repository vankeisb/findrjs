import { Findr } from './Findr';

function setupDom() {
  document.body.innerHTML =
    '<div class="outer">' +
    '  <span id="username" />' +
    '  <button id="doit" />' +
    '</div>';
}

function assertTimeout(f: Findr) {
  f.eval()
    .then(() => fail('should have thrown'))
    .catch((err) => expect(err).toEqual('timed out'));
}

describe('Findr tests', () => {
  test('simple dom', async () => {
    setupDom();
    await Findr.ROOT.$('#username').eval();
  });
  test('timeout', async () => {
    setupDom();
    assertTimeout(Findr.ROOT.setTimeout(1000).$('#yalla'));
  });
  test('dom update async', async () => {
    document.body.innerHTML = '<div>yalla</div>';
    setTimeout(() => {
      setupDom();
    }, 3000);
    await Findr.ROOT.$('#username').eval();
  });
  test('multiple elements', async () => {
    setupDom();
    await Findr.ROOT.$('.outer').$('button').eval();
  });
  test('multiple elements failed', async () => {
    setupDom();
    assertTimeout(Findr.ROOT.$('.outer').$('svg'));
  });
  test('multiple elements where ok', async () => {
    setupDom();
    await Findr.ROOT.$('.outer')
      .where((e) => e.classList.contains('outer'))
      .$('button')
      .where((e) => e.id === 'doit')
      .eval();
  });
  test('multiple elements where failed', async () => {
    setupDom();
    assertTimeout(
      Findr.ROOT.setTimeout(1000)
        .$('.outer')
        .where((e) => e.classList.contains('outer'))
        .$('button')
        .where((e) => e.id === 'doit'),
    );
  });
});
