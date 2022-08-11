const db = require('../../models')
const Category = db.Category

const categoryService = require('../../services/categoryService.js')

let categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  postCategory: (req, res, next) => {
    categoryService.postCategory(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  putCategory: (req, res, next) => {
    categoryService.putCategory(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  deleteCategory: (req, res, next) => {
    categoryService.deleteCategory(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  }
}
module.exports = categoryController