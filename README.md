[![CircleCI](https://circleci.com/gh/pojosontheweb/selenium-utils/tree/develop.svg?style=svg)](https://circleci.com/gh/pojosontheweb/selenium-utils/tree/develop)

![NPM Version](https://img.shields.io/npm/v/findrjs)

Findr is a tiny library that helps writing DOM async/retry code in a fluent manner.

```javascript
    // waits until all conditions are 
    // satisfied, throws on timeout
    await Findr.ROOT
        .$$('foo')
        .where(e => e.getAttribute('funky') === 'yes')
        .count(2)
        .at(1)
        .$('bar')
        .eval();
```

It's a TS port of the Java [selenium-utils](https://github.com/pojosontheweb/selenium-utils) lib.

Have a look at the tests for more examples. 

To use inside your browser, copy the [script](https://vankeisb.github.io/findrjs/findr.js)
and paste it into your DevTools console.