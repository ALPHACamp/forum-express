# README

## Initialize
```
git clone https://github.com/ALPHACamp/forum-express.git
cd forum-express
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
```

### Heroku
- https://forum-express-demo.herokuapp.com/
- 可使用 root@example.com 登入，密碼 12345678

## User stories

**前台**

* 使用者可以註冊/登入/登出網站
* 使用者可以在瀏覽所有餐廳與個別餐廳詳細資料
* 在瀏覽所有餐廳資料時，可以用分類篩選餐廳
* 使用者可以對餐廳留下評論
* 使用者可以收藏餐廳
* 使用者可以查看最新上架的 10 筆餐廳
* 使用者可以查看最新的 10 筆評論
* 使用者可以編輯自己的個人資料
* 使用者可以查看自己評論過、收藏過的餐廳
* 使用者可以追蹤其他的使用者
* 使用者可以查看自己追蹤中的使用者與正在追蹤自己的使用者

**後台**

* 只有網站管理者可以登入網站後台
* 網站管理者可以在後台管理餐廳的基本資料
* 網站管理者可以在後台管理餐廳分類

## 關於測試

1. 介紹測試概念與準備測試環境（Mocha）
2. 撰寫第一個測試
3. 示範一個 CRUD 的測試該如何進行
4. 依照程式結構定義測試（API、Controller、Service、Model...）

### 介紹測試概念與準備測試環境（Mocha）

1. 測試的類型與目的

* 單元測試 (unit testing)
* 整合測試 (integration testing)
* 驗收測試 (acceptance Test / end-to-end testing)

2. BDD & TDD

* TDD 是一種開發的流程。許多專案在開發時，通常會邊寫程式邊寫測試，或是先寫程式後寫測試，或是更常見 — 你知道的，寫了程式不寫測試。
TDD 則是「先寫測試再開發程式」。

* BDD 則是比起 TDD 更進一步，除了在實作前先寫測試外，而在測試前還要先寫規格，但是這份規格並不是單純的敘述軟體的功能，而是這份規格，是一份「可以執行的規格」。

3. 工具與生態系

* Mocha (Node.js 裡的名人 TJ Holowaychuk)
* Supertest
* Stub & Mock
* webdriverio & nightwatch （F2E Testing）

### 撰寫第一個測試

- [ ] Array - #indexOf() - should return -1 when the value is not present
- [ ] 比較斷言庫的不同
- [ ] 了解每一個測試案例的生命週期

### 示範一個 CRUD 的測試該如何進行

- [ ] User 的 CRUD action => Model
- [ ] User 的註冊 => Controller
- [ ] User 的註冊 => API

### 依照程式結構定義測試（API、Controller、Model...）

- [ ] file structure for testing
- [ ] model
- [ ] controller / api
- [ ] # User controller api - /api/signup
- [ ] # User controller api - /api/signin
- [ ] # User controller api - /api/users/top - 已登入 & 未登入
