import { Findr } from '.';

function setupDom() {
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';
}

describe('findrjs tests', () => {
  test('simple dom', async () => {
    setupDom();
    await Findr.ROOT.element('#username').eval();
  });
  test('timeout', async () => {
    setupDom();
    try {
      await Findr.ROOT.element('#yalla').eval();
      fail('should have thrown');
    } catch (err) {
      expect(err).toEqual('timed out');
    }
  });
  test('dom update async', async () => {
    document.body.innerHTML = '<div>yalla</div>';
    setTimeout(() => {
      setupDom();
    }, 3000);
    await Findr.ROOT.element('#username').eval();
  });
});
