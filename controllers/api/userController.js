const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User
const userService = require('../../services/userService.js')

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let userController = {
  signIn: (req, res, next) => {
    // 檢查必要資料
    if (!req.body.email || !req.body.password) {
      return res.json({ status: 'error', message: "required fields didn't exist" })
    }
    // 檢查 user 是否存在與密碼是否正確
    let username = req.body.email
    let password = req.body.password

    User.findOne({ where: { email: username } })
      .then(user => {
        if (!user) return res.status(401).json({ status: 'error', message: 'no such user found' })
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ status: 'error', message: 'passwords did not match' })
        }

        // 簽發 token
        var payload = { id: user.id }
        var token = jwt.sign(payload, process.env.JWT_SECRET)
        return res.json({
          status: 'success',
          message: 'ok',
          token: token,
          user: {
            id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin
          }
        })
      })
      .catch(err => {
        next(err)
      })
  },
  signUp: (req, res, next) => {
    if (req.body.passwordCheck !== req.body.password) {
      return res.json({ status: 'error', message: '兩次密碼輸入不同！' })
    } else {
      User.findOne({ where: { email: req.body.email } })
        .then(user => {
          if (user) {
            return res.json({ status: 'error', message: '信箱重複！' })
          } else {
            User.create({
              name: req.body.name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
            }).then(user => {
              return res.json({ status: 'success', message: '成功註冊帳號！' })
            }).catch(err => {
              next(err)
            })
          }
        })
        .catch(err => {
          next(err)
        })
    }
  },
  getUser: (req, res, next) => {
    userService.getUser(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  putUser: (req, res, next) => {
    userService.putUser(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  addFavorite: (req, res, next) => {
    userService.addFavorite(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },

  removeFavorite: (req, res, next) => {
    userService.removeFavorite(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  addLike: (req, res, next) => {
    userService.addLike(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },

  removeLike: (req, res, next) => {
    userService.removeLike(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getTopUser: (req, res, next) => {
    userService.getTopUser(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  addFollowing: (req, res, next) => {
    userService.addFollowing(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  removeFollowing: (req, res, next) => {
    userService.removeFollowing(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  getCurrentUser: (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      isAdmin: req.user.isAdmin
    })
  }
}

module.exports = userController
