const assert = require('assert')
const moment = require('moment')
const chai = require('chai')
const should = chai.should()
const helpers = require('../config/handlebars-helpers')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
}); 

describe('config/handlebars-helpers', function() {
  describe('#moment()', function() {
    it('get moment(a).fromNow()', function() {
      assert.equal(moment().fromNow(), helpers.moment())
      chai.assert.equal(moment().fromNow(), helpers.moment())
      chai.expect(moment().fromNow()).to.equal(helpers.moment())
      moment().fromNow().should.equal(helpers.moment())
    });
  });
}); 