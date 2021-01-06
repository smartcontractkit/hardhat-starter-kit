'use strict';

var requireUncached = require('require-uncached');
var chai = requireUncached('chai');
var expect = chai.expect;
chai.should();

chai.use(require('chai-as-promised'));
chai.use(requireUncached('../lib/dirty-chai'));

function shouldFail(func, msg) {
  it('should fail with a message', function() {
    expect(func).to.throw(msg);
  });
}

describe('dirty chai', function() {
  describe('ok', function() {

    describe('when true expression', function() {
      it('should not assert function', function() {
          expect(true).to.be.ok();
      });

      it('should not assert property', function() {
          expect(true).to.be.ok.and.not.equal(false);
      });

      it('should not assert another chain conversion', function() {
          expect(true).to.be.ok.and.not.false();
      });

      it('should not assert with ensure', function() {
          expect(true).to.be.ok.ensure();
          expect(true).to.be.ok.not.ensure();
      });

      it('should work with should', function() {
        true.should.be.true.and.not.false();
      });
    });

    
    describe('when false expression', function() {
      it('should assert non-function at chain end', function() {
        var assertion = expect(true).to.not.be.ok.and.not;
        shouldFail(function () {
          assertion.equal.call(assertion, false);
        }, /expected true to be falsy/);
      });

      it('should assert with custom message at chain end', function() {
        expect(function() {
          expect(true).to.not.be.false.and.be.ok('true is not ok');
        }).to.throw(/true is not ok/);
      });

      it('should assert function mid-chain', function() {
        expect(function() {
          expect(true).to.not.be.ok().and.not.equal(false);
        }).to.throw(/expected true to be falsy/);
      });

      it('should assert with custom message mid-chain', function() {
        expect(function() {
          expect(true).to.not.be.ok('true is not ok').and.not.equal(false);
        }).to.throw(/true is not ok/);
      });

      it('should assert with custom message of terminating assert', function() {
        expect(function() {
          expect(true).to.be.ok.and.not.equal(true, 'true is not ok');
        }).to.throw(/true is not ok/);
      });

      it('should assert with ensure', function() {
        expect(function() {
          expect(true).to.not.be.ok.ensure();
        }).to.throw(/expected true to be falsy/);
      });
    });

  });

  describe('immutable properties', function() {
    describe('length', function() {
      it('should successfully assert length early in the chain', function() {
        [1].should.have.length(1);
      });

      it('should assert wrong length', function() {
        expect(function() {
          [1, 1, 2, 3, 5].should.have.length(33);
        }).to.throw();
      });
    });

    describe('arguments', function() {
      it('should successfully assert arguments early in the chain', function() {
        function testFunc() {
          arguments.should.be.arguments();
        }
        testFunc('Err, param!');
      });

      it('should assert on non-arguments', function() {
        expect(function() {
          var o = {};
          o.should.be.arguments();
        }).to.throw();
      });
    });

  });

  describe('when plugin creates new property', function() {
    var stubCalled;

    beforeEach(function() {
      stubCalled = false;

      chai.use(function(chai, util) {
        chai.Assertion.addProperty('neverFail', function() { this.assert(true === true); stubCalled = true; });
        chai.Assertion.addProperty('flagelate', function() { util.flag(this, 'legfree', true); });
      });
    });

    it('should convert property to a chainable method', function() {
      var prop = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'neverFail');
      (new chai.Assertion({})).should.have.a.property('neverFail').and.be.a('function');
      prop.should.have.property('get').and.be.a('function');
      ((new chai.Assertion({}).neverFail)).should.be.a('function');
    });

    it('should call assertion', function() {
      expect(true).to.neverFail();

      expect(stubCalled).to.be.true();
    });
  });

  describe('compatibility with chai-as-promised', function() {
    it('should pass with resolved promise', function() {
      return expect(Promise.resolve(true)).to.eventually.be.true();
    });

    it('should pass with rejected promise', function() {
      var err = new Error('foo');
      err.name = 'bar';
      return expect(Promise.reject(err)).to.eventually
        .be.rejectedWith(Error)
        .and.to.have.property('name', 'bar');
    });
  });
});
