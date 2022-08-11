const db = require('../models')
const Category = db.Category

let categoryService = {
  getCategories: (req, res, callback, errorHandler) => {
    return Category.findAll()
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id)
            .then((category) => {
              return res.render('admin/categories', { categories: categories, category: category })
            })
        } else {
          callback({ categories: categories })
        }
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  postCategory: (req, res, callback, errorHandler) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          callback({
            status: 'success',
            message: 'category was successfully created',
            categoryId: category.id
          })
        })
        .catch(err => {
          errorHandler(err)
        })
    }
  },
  putCategory: (req, res, callback, errorHandler) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.findByPk(req.params.id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              callback({
                status: 'success',
                message: 'category was successfully updated',
                categoryId: category.id
              })
            })
        })
        .catch(err => {
          errorHandler(err)
        })
    }
  },
  deleteCategory: (req, res, callback, errorHandler) => {
    return Category.findByPk(req.params.id)
      .then((category) => {
        category.destroy()
          .then((category) => {
            callback({ status: 'success', message: '' })
          })
          .catch(err => {
            errorHandler(err)
          })
      })
      .catch(err => {
        errorHandler(err)
      })
  }
}
module.exports = categoryService
