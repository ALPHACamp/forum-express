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

## Swagger UI
* 進入 /api-docs 可以查看目前支援的 API endpoints
* 在 Swagger UI 的 Authorize 中，可以放入登入後的 user token 以調用大部分的 endpoint

## General response
* 在所有 API endpoints 控制下的回傳範本格式如下

  ```json
  // 成功回傳
  {
  	status: "success",
  	message: "成功處理訊息",  // 部分 endpoints 回傳
  	...data
  }
  
  // 錯誤回傳
  {
  	status: "error",
  	message: "錯誤訊息"
  }
  ```

  