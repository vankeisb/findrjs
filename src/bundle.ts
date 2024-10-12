import * as findr from './index';

const root = findr.Findr.ROOT;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkgJson = require('../package.json');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window['findr'] = {
  root,
  $: root.$.bind(root),
  $$: root.$$.bind(root),
  enableLogging: findr.Findr.enableLogging,
};

console.log(`
 ┏┓•   ┓  
 ┣ ┓┏┓┏┫┏┓
 ┻ ┗┛┗┗┻┛  v${pkgJson.version}    
 lib loaded ! findr is available
 
`);
