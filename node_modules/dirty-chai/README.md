dirty-chai
==========
Function form for terminating assertion properties.

## Install
```
npm install dirty-chai --save-dev
```
## Usage

`dirty-chai` is a chai [plugin](http://chaijs.com/plugins).

```js
var chai = require('chai');
var dirtyChai = require('dirty-chai');
var expect = chai.expect

chai.use(dirtyChai);
// ...
expect(true).to.be.true();
```

## Custom Error Messages

With this function form for terminating properties you can also provide custom error messages to show when the assertion fails. This works whether the assertion is somewhere mid-chain or at the end.

```js
expect(true).to.be.true.and.not.false('Reason: Paradox');
expect(true).to.be.true('The fabric of logic has torn').and.not.false();
```

## Affected Assertions

The following built-in assertions are modified by this plugin to now use the function-call form:

* ok
* true
* false
* null
* undefined
* exist
* empty
* arguments
* Arguments

## Caveats

**Always terminate with a function**

These forms can also be mixed, but the chain must always be terminated in the function form or assertions up to that point in the chain will not execute.

```js
expect(true).to.be.true.and.not.false();
expect(true).to.be.true().and.not.false();
```

**Chaining length/arguments**

This breaks both the `length` and `arguments` asserts when they are in the chain following any other assertion. To work around this limitation, do the `length` or `arguments` asserts first in the chain or just do multiple assertion statements.

```js
myArray.should.exist.and.should.have.length(3); // Error: length is not a function

// Do two assert statements instead
myArray.should.exist();
myArray.should.have.length(3);
```

** use with chai-as-promised **

If you're using chai-as-promised, you should `.use` chai-as-promised before dirty-chai:

```js
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var dirtyChai = require("dirty-chai");


chai.use(chaiAsPromised);
chai.use(dirtyChai);
```

## Plugin Assertions

This plugin will also hook and convert any property assertions added by other Chai plugins. The only thing you need to do is make sure to load dirty-chai before any other plugins so that it can get its hooks in place before the other plugins are loaded.

For example, if you load [sinon-chai](https://github.com/domenic/sinon-chai) after dirty-chai, all of its property assertions will now be method assertions.

```js
spy.should.have.been.called();
spy.should.have.been.calledOnce();
spy.should.have.been.calledTwice();
```

## Why?

[Chai](https://github.com/chaijs/chai) is probably one of the most popular assertion libraries in the node. It has over 400 dependents and is downloaded almost 500,000/month. 

For stylistic reasons, Chai was designed so that any assertions that did not require parameters would simply assert on property access. This allowed those assertions to elide the empty parens that would be required if those assertions were methods.

This design decision has a pretty big impact on how much trust you can place in your tests, especially if you don't adhere strictly to TDD's red-green-refactor flow. For a detailed descent into why, read [Beware of libraries that assert on property access](https://github.com/moll/js-must#asserting-on-property-access).

There is also the problem of getting errors from linters like JSHint. If you are linting your test code, your linter will complain with an error something like "Expected an assignment or function call and instead saw an expression." Since the linter doesn't know about the property getter it assumes this line has no side-effects, and throws a warning in case you made a mistake.

Squelching these errors is not a good solution as test code is getting to be just as important as, if not more than, production code. Catching syntactical errors in tests using static analysis is a great tool to help make sure that your tests are well-defined and free of typos.

This plugin was written so that we can still take advantage of the large ecosystem of projects and plugins written with/for Chai, while still being able to trust your tests. It converts the built-in property assertions to method assertions, including any property assertions added by plugins.

The list of affected assertions, and many assertions added by plugins, are property getters that assert immediately on access. Because of that, they were written to be used by terminating the assertion chain with a property access.

```js
expect(true).to.be.true;
foo.should.be.ok;
````

A better option was to provide a function-call form for these assertions so that the code's intent is more clear and the linters stop complaining about something looking off. This form is added in addition to the existing property access form and does not impact existing test code.

```js
expect(true).to.be.true();
foo.should.be.ok();
```
