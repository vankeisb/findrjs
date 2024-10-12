import * as findr from './index';

const root = findr.Findr.ROOT;

const pkgJson = require('../package.json');

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
