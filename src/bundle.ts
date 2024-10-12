import * as findr from './index';

// @ts-ignore
window['findr'] = findr;
// @ts-ignore
window['$'] = findr.Findr.ROOT.$;
// @ts-ignore
window['$$'] = findr.Findr.ROOT.$$;

console.log('Findr lib loaded : findr, $, and $$ are available');
