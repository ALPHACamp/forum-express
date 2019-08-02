const assert = require('assert')
const moment = require('moment')
const chai = require('chai')
const request = require('supertest')
const should = chai.should()
const { expect } = require('chai')

const app = require('../../../app')
const db = require('../../../models')

describe('# User controller api', function() {
    

  describe('/api/signup', () => {

      before(async function() {
        // 在所有測試開始前會執行的程式碼區塊
        await db.User.destroy({where: {},truncate: true})
      });

      after(async function() {
        // 在所有測試結束後會執行的程式碼區塊
        await db.User.destroy({where: {},truncate: true})
      });

      it("(O) 註冊帳號成功", (done) => {
          request(app)
            .post('/api/signup')
            .send('name=name&email=email&password=password&passwordCheck=password')
            .expect(200)
            .end(function(err, res) {
              
              // 條件一：成功回傳資料
              expect(res.body.status).to.be.equal('success')

              db.User.findOne({
                where: {
                  email: 'email'
                }
              }).then((user) => {  
                // 條件二：成功寫入資料庫
                expect(user.email).to.be.equal('email')
                done()
              })
          });
      });

      it("(X) 兩次密碼輸入不同", (done) => {
          request(app)
            .post('/api/signup')
            .send('name=name1&email=email1&password=password1&passwordCheck=password')
            .expect(200)
            .end(function(err, res) {
              
              // 條件一：回傳資料狀態顯示失敗
              expect(res.body.status).to.be.equal('error')
              // 條件一：檢查回傳資料訊息
              expect(res.body.message).to.be.equal('兩次密碼輸入不同！')
              done()
          });
      });

      it("(X) 信箱重複", (done) => {
          request(app)
            .post('/api/signup')
            .send('name=name&email=email&password=password&passwordCheck=password')
            .expect(200)
            .end(function(err, res) {
              
              // 條件一：回傳資料狀態顯示失敗
              expect(res.body.status).to.be.equal('error')
              // 條件一：檢查回傳資料訊息
              expect(res.body.message).to.be.equal('信箱重複！')
              done()
          });
      });

  })
})

