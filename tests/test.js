const assert = require('assert')
const moment = require('moment')
const chai = require('chai')
const request = require('supertest')
const should = chai.should()
const { expect } = require('chai')

const app = require('../app')
const db = require('../models')
const helpers = require('../config/handlebars-helpers')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
}); 

describe('config/handlebars-helpers', function() {
  before(function() {
    // 在所有測試開始前會執行的程式碼區塊
    console.log(' ===== before ===== ')
  });

  after(function() {
    // 在所有測試結束後會執行的程式碼區塊
    console.log(' ===== after ===== ')
  });

  beforeEach(function() {
    // 在每個 Test Case 開始前執行的程式碼區塊
    console.log(' == beforeEach == ')
  });

  afterEach(function() {
    // 在每個 Test Case 結束後執行的程式碼區塊
    console.log(' == afterEach == ')
  });


  describe('#moment #1()', function() {
    
    it('get moment(a).fromNow()', function() {
      assert.equal(moment().fromNow(), helpers.moment())
      chai.assert.equal(moment().fromNow(), helpers.moment())
      chai.expect(moment().fromNow()).to.equal(helpers.moment())
      moment().fromNow().should.equal(helpers.moment())
    });

    it('get moment(a).fromNow()', function() {
      chai.expect(moment().fromNow()).not.to.equal(0)
    });
  });

  describe('#moment #2()', function() {
    
    it('get moment(a).fromNow()', function() {
      assert.equal(moment().fromNow(), helpers.moment())
      chai.assert.equal(moment().fromNow(), helpers.moment())
      chai.expect(moment().fromNow()).to.equal(helpers.moment())
      moment().fromNow().should.equal(helpers.moment())
    });

    it('get moment(a).fromNow()', function() {
      chai.expect(moment().fromNow()).not.to.equal(0)
    });
  });
});

describe('# User Model', () => {

  describe('CRUD', () => {

    let data = null

    it('create', (done) => {
      db.User.create({}).then((user) => {   
        data = user
        done()
      })
    })
    it('read', (done) => {
        db.User.findByPk(data.id).then((user) => {  
          expect(data.id).to.be.equal(user.id)
          done()
        })
    })
    it('update', (done) => {
      db.User.update({}, { where: { id: data.id }}).then(() => {
        db.User.findByPk(data.id).then((user) => { 
          expect(data.updatedAt).to.be.not.equal(user.updatedAt) 
          done()
        })
      })
    })
    it('delete', (done) => {
      db.User.destroy({ where: { id: data.id }}).then(() => {
        db.User.findByPk(data.id).then((user) => { 
          expect(user).to.be.equal(null) 
          done()
        })
      })
    })
  })
})

describe('# signup', function() {
    it("should create user", (done) => {
        request(app)
          .post('/signup')
          .send('name=name&email=email&password=password&passwordCheck=password')
          .expect(302)
          .end(function(err, res) {
            db.User.findOne({
              where: {
                email: 'email'
              }
            }).then((user) => {  
              expect(user.email).to.be.equal('email')
              done()
            })
        });
    });
})
