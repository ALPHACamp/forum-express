const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const adminService = {
  getRestaurants: (req, res, callback, errorHandler) => {
    return Restaurant.findAll({ include: [Category] })
      .then(restaurants => {
        callback({ restaurants: restaurants })
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  postRestaurant: (req, res, callback, errorHandler) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    }
    const { file } = req // equal to const file = req.file
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId
        }).then((restaurant) => {
          callback({ status: 'success', message: 'restaurant was successfully created' })
        }).catch(err => {
          errorHandler(err)
        })
      })
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        CategoryId: req.body.categoryId
      })
        .then((restaurant) => {
          callback({
            status: 'success',
            message: 'restaurant was successfully created',
            restaurant: restaurant
          })
        })
        .catch(err => {
          errorHandler(err)
        })
    }
  },
  getRestaurant: (req, res, callback, errorHandler) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] })
      .then(restaurant => {
        callback({ restaurant: restaurant })
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  putRestaurant: (req, res, callback, errorHandler) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        if (err) {
          return errorHandler(err)
        }

        return Restaurant.findByPk(req.params.id)
          .then((restaurant) => {
            restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
              CategoryId: req.body.categoryId
            }).then((restaurant) => {
              callback({ status: 'success', message: 'restaurant was successfully to update' })
            }).catch(err => {
              errorHandler(err)
            })
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image,
            CategoryId: req.body.categoryId
          }).then((restaurant) => {
            callback({ status: 'success', message: 'restaurant was successfully to update' })
          }).catch(err => {
            errorHandler(err)
          })
        })
    }
  },
  deleteRestaurant: (req, res, callback, errorHandler) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        { model: Comment, include: [User] }
      ]
    })
      .then((restaurant) => {
        console.log('restaurant.Comments', restaurant.Comments)
        restaurant.Comments.map(comment => {
          console.log('comment.id', comment.id)
          comment.destroy()
        })
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
          .catch(err => {
            errorHandler(err)
          })
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  getUsers: (req, res, callback, errorHandler) => {
    return User.findAll()
      .then(users => {
        callback({ users: users })
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  putUsers: (req, res, callback, errorHandler) => {
    return User.findByPk(req.params.id)
      .then((user) => {
        user.update({
          isAdmin: req.body.isAdmin === 'true'
        })
          .then((restaurant) => {
            callback({
              status: 'success',
              message: 'user was successfully to update'
            })
          })
      })
      .catch(err => {
        errorHandler(err)
      })
  }
}

module.exports = adminService
