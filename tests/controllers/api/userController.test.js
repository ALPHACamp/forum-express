const assert = require('assert')
const moment = require('moment')
const chai = require('chai')
const request = require('supertest')
const should = chai.should()
const { expect } = require('chai')

const app = require('../../../app')
const db = require('../../../models')

describe('# User controller api', function() {
    it("/api/signup", (done) => {
        request(app)
          .post('/api/signup')
          .send('name=name&email=email2&password=password&passwordCheck=password')
          .expect(200)
          .end(function(err, res) {
            db.User.findOne({
              where: {
                email: 'email2'
              }
            }).then((user) => {  
              expect(user.email).to.be.equal('email2')
              done()
            })
        });
    });
})