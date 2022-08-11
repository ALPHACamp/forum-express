const restService = require('../../services/restService.js')

const restController = {
  getRestaurants: (req, res, next) => {
    restService.getRestaurants(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getRestaurant: (req, res, next) => {
    restService.getRestaurant(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getFeeds: (req, res, next) => {
    restService.getFeeds(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getDashboard: (req, res, next) => {
    restService.getDashboard(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getTopRestaurants: (req, res, next) => {
    restService.getTopRestaurants(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  }
}

module.exports = restController
