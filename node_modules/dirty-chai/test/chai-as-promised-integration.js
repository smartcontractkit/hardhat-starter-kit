'use strict';

require('es6-promise').polyfill();

describe('dirty chai', function() {
  describe('chai-as-promised integration', function() {
      var requireUncached,
          chai,
          expect;

    beforeEach(function() {
      requireUncached = require('require-uncached');
      chai = requireUncached('chai');
      expect = chai.expect;

      chai.should();
      chai.use(requireUncached('chai-as-promised'));
      chai.use(requireUncached('../lib/dirty-chai'));
    });


    // erroneously fails with expected { Object (_id, _state, ...) } to equal 'hi'
    it('resolved should resolve', function () {
      return Promise.resolve('hi').should.eventually.equal('hi');
    });

    it('should dirty promise', function() {
      return Promise.resolve(true).should.eventually.be.true();
    });

    it('should be dirty', function() {
      var t = {};
      t.should.be.ok();
    });

    it('should assert dirty', function() {
      expect(function() {
        true.should.be.false();
      }).to.throw();
    });
  });
});
