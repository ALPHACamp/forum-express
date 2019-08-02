const assert = require('assert')
const moment = require('moment')
const chai = require('chai')
const request = require('supertest')
const should = chai.should()
const { expect } = require('chai')

const app = require('../app')
const db = require('../models')
const helpers = require('../config/handlebars-helpers')

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// }); 

// describe('config/handlebars-helpers', function() {
//   before(function() {
//     // 在所有測試開始前會執行的程式碼區塊
//     console.log(' ===== before ===== ')
//   });

//   after(function() {
//     // 在所有測試結束後會執行的程式碼區塊
//     console.log(' ===== after ===== ')
//   });

//   beforeEach(function() {
//     // 在每個 Test Case 開始前執行的程式碼區塊
//     console.log(' == beforeEach == ')
//   });

//   afterEach(function() {
//     // 在每個 Test Case 結束後執行的程式碼區塊
//     console.log(' == afterEach == ')
//   });


//   describe('#moment #1()', function() {
    
//     it('get moment(a).fromNow()', function() {
//       assert.equal(moment().fromNow(), helpers.moment())
//       chai.assert.equal(moment().fromNow(), helpers.moment())
//       chai.expect(moment().fromNow()).to.equal(helpers.moment())
//       moment().fromNow().should.equal(helpers.moment())
//     });

//     it('get moment(a).fromNow()', function() {
//       chai.expect(moment().fromNow()).not.to.equal(0)
//     });
//   });

//   describe('#moment #2()', function() {
    
//     it('get moment(a).fromNow()', function() {
//       assert.equal(moment().fromNow(), helpers.moment())
//       chai.assert.equal(moment().fromNow(), helpers.moment())
//       chai.expect(moment().fromNow()).to.equal(helpers.moment())
//       moment().fromNow().should.equal(helpers.moment())
//     });

//     it('get moment(a).fromNow()', function() {
//       chai.expect(moment().fromNow()).not.to.equal(0)
//     });
//   });
// });
