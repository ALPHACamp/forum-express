const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminService = require('../../services/adminService.js')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  postRestaurant: (req, res, next) => {
    adminService.postRestaurant(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getRestaurant: (req, res, next) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  putRestaurant: (req, res, next) => {
    adminService.putRestaurant(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  deleteRestaurant: (req, res, next) => {
    adminService.deleteRestaurant(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getUsers: (req, res, next) => {
    adminService.getUsers(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  putUsers: (req, res, next) => {
    adminService.putUsers(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  }
}
module.exports = adminController
