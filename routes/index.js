const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')

module.exports = app => {
  // 如果使用者訪問首頁，就導向 /restaurants 的頁面
  app.get('/', (req, res) => res.redirect('restaurants'))
  app.get('/restaurants', restController.getRestaurants)
}
