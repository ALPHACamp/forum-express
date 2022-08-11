const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant
const Comment = db.Comment
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const userService = {
  getUser: (req, res, callback, errorHandler) => {
    return User.findByPk(req.params.id, {
      include: [
        { model: Comment, include: Restaurant },
        { model: Restaurant, as: 'FavoritedRestaurants' },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    }).then(user => {
      user.CommentsRestaurants = []
      user.Comments.map((comment) => {
        if (!user.CommentsRestaurants.map(d => d.id).includes(comment.RestaurantId)) {
          user.CommentsRestaurants.push(comment.Restaurant)
          return comment
        }
      })
      const isFollowed = req.user.Followings.map(d => d.id).includes(user.id)
      callback({ profile: user, isFollowed: isFollowed })
    }).catch(err => {
      errorHandler(err)
    })
  },
  putUser: (req, res, callback, errorHandler) => {
    if (Number(req.params.id) !== Number(req.user.id)) {
      return callback({ status: 'error', message: 'permission denied' })
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        if (err) {
          return errorHandler(err)
        }
        return User.findByPk(req.params.id)
          .then((user) => {
            user.update({
              name: req.body.name,
              image: img.data.link
            }).then((user) => {
              return callback({ status: 'success', message: 'updated successfully' })
            }).catch(err => {
              errorHandler(err)
            })
          })
          .catch(err => {
            errorHandler(err)
          })
      })
    } else {
      return User.findByPk(req.params.id)
        .then((user) => {
          user.update({
            name: req.body.name
          }).then((user) => {
            return callback({ status: 'success', message: 'updated successfully' })
          }).catch(err => {
            errorHandler(err)
          })
        })
        .catch(err => {
          errorHandler(err)
        })
    }
  },
  addFavorite: (req, res, callback, errorHandler) => {
    return Favorite.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    })
      .then((restaurant) => {
        return callback({ status: 'success', message: '' })
      })
      .catch(err => {
        errorHandler(err)
      })
  },

  removeFavorite: (req, res, callback, errorHandler) => {
    return Favorite.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then((favorite) => {
        favorite.destroy()
          .then((restaurant) => {
            return callback({ status: 'success', message: '' })
          })
          .catch(err => {
            errorHandler(err)
          })
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  addLike: (req, res, callback, errorHandler) => {
    return Like.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    }).then((restaurant) => {
      return callback({ status: 'success', message: '' })
    }).catch(err => {
      errorHandler(err)
    })
  },

  removeLike: (req, res, callback, errorHandler) => {
    return Like.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    }).then((like) => {
      like.destroy()
        .then((restaurant) => {
          return callback({ status: 'success', message: '' })
        })
        .catch(err => {
          errorHandler(err)
        })
    }).catch(err => {
      errorHandler(err)
    })
  },
  getTopUser: (req, res, callback, errorHandler) => {
    return User.findAll({
      include: [
        { model: User, as: 'Followers' }
      ]
    }).then(users => {
      users = users.map(user => ({
        ...user.dataValues,
        FollowerCount: user.Followers.length,
        isFollowed: req.user.Followings ? req.user.Followings.map(d => d.id).includes(user.id) : false
      }))
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)
      callback({ users: users })
    }).catch(err => {
      errorHandler(err)
    })
  },
  addFollowing: (req, res, callback, errorHandler) => {
    return Followship.create({
      followerId: req.user.id,
      followingId: req.params.userId
    })
      .then((followship) => {
        return callback({ status: 'success', message: '' })
      })
      .catch(err => {
        errorHandler(err)
      })
  },

  removeFollowing: (req, res, callback, errorHandler) => {
    return Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
      .then((followship) => {
        followship.destroy()
          .then((followship) => {
            return callback({ status: 'success', message: '' })
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

module.exports = userService
