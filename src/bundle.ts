import * as findr from './index';

const root = findr.Findr.ROOT;

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
 ┻ ┗┛┗┗┻┛     
 lib loaded ! findr is available
`);
