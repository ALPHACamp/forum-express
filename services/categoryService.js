const db = require('../models')
const Category = db.Category

let categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id)
          .then((category) => {
            return res.render('admin/categories', { categories: categories, category: category })
          })
      } else {
        callback({ categories: categories })

      }
    })
  },
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist'})
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          callback({ status: 'success', message: 'category was successfully created' })
        })
    }
  },
}
module.exports = categoryService