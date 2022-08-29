const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const { generalErrorHandler } = require('../middlewares/errorHandler')
const { adminAuthenticator } = require('../middlewares/adminAuthenticator')

const adminController = require('../controllers/api/adminController')
const commentController = require('../controllers/api/commentController')
const favoriteController = require('../controllers/api/favoriteController')
const followshipController = require('../controllers/api/followshipController')
const likeController = require('../controllers/api/likeController')
const restController = require('../controllers/api/restController')
const userController = require('../controllers/api/userController')

const authenticated = passport.authenticate('jwt', { session: false })

router.get('/get_current_user', authenticated, userController.getCurrentUser)

router.get('/', authenticated, (req, res) => res.redirect('/api/restaurants'))
router.get('/restaurants', authenticated, restController.getRestaurants)
router.get('/restaurants/feeds', authenticated, restController.getFeeds)
router.get('/restaurants/top', authenticated, restController.getTopRestaurants)
router.get('/restaurants/:id', authenticated, restController.getRestaurant)

router.get('/users/top', authenticated, userController.getTopUser)
router.get('/users/:id', authenticated, userController.getUser)
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)

router.post('/favorite/:restaurantId', authenticated, favoriteController.postFavorite)
router.delete('/favorite/:restaurantId', authenticated, favoriteController.deleteFavorite)

router.post('/like/:restaurantId', authenticated, likeController.postLike)
router.delete('/like/:restaurantId', authenticated, likeController.deleteLike)

router.post('/comments', authenticated, commentController.postComment)
router.delete('/comments/:id', authenticated, adminAuthenticator, commentController.deleteComment)

router.post('/following/:userId', authenticated, followshipController.postFollowship)
router.delete('/following/:userId', authenticated, followshipController.deleteFollowship)

router.get('/admin', authenticated, adminAuthenticator, (req, res) => res.redirect('/api/admin/restaurants'))
router.get('/admin/restaurants', authenticated, adminAuthenticator, adminController.getRestaurants)
router.get('/admin/restaurants/:id', authenticated, adminAuthenticator, adminController.getRestaurant)
router.post('/admin/restaurants', authenticated, adminAuthenticator, upload.single('image'), adminController.postRestaurant)
router.put('/admin/restaurants/:id', authenticated, adminAuthenticator, upload.single('image'), adminController.putRestaurant)
router.delete('/admin/restaurants/:id', authenticated, adminAuthenticator, adminController.deleteRestaurant)

router.get('/admin/users', authenticated, adminAuthenticator, adminController.getUsers)
router.put('/admin/users/:id', authenticated, adminAuthenticator, adminController.putUser)

router.get('/admin/categories', authenticated, adminAuthenticator, adminController.getCategories)
router.post('/admin/categories', authenticated, adminAuthenticator, adminController.postCategory)
router.put('/admin/categories/:id', authenticated, adminAuthenticator, adminController.putCategory)
router.delete('/admin/categories/:id', authenticated, adminAuthenticator, adminController.deleteCategory)

// JWT signin
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

router.use('/', generalErrorHandler)

module.exports = router
