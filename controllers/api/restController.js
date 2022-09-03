const { SuccessResponse } = require('../../data/response')

const restService = require('../../services/restService')
const categoryService = require('../../services/categoryService')
const commentService = require('../../services/commentService')

const paginationHelper = require('../../helpers/paginationHelper')

const restController = {
  getRestaurants: async (req, res, next) => {
    /*  #swagger.tags = ['Restaurant']
    #swagger.summary = '取得所有餐廳' */

    /*  #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: '取得頁數'
    } */
    /*  #swagger.parameters['categoryId'] = {
          in: 'query',
          type: 'integer',
          description: '類別ID'
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const pagination = paginationHelper.getPagination(req.query.page)

      const queryOptions = {
        pagination: pagination.pagination
      }

      if (req.query.categoryId) {
        queryOptions.condition = {
          CategoryId: Number(req.query.categoryId)
        }
      }

      const categoryTask = categoryService.getCategories()
      const result = await restService.getRestaurantsAndCount(queryOptions)

      const favoritedRestaurantIds = req.user.FavoritedRestaurants ? req.user.FavoritedRestaurants.map(f => f.id) : []
      const likedRestaurantIds = req.user.LikedRestaurants ? req.user.LikedRestaurants.map(l => l.id) : []

      const restaurants = result.rows.map(r => {
        const item = r.get()

        item.description = item.description.substring(0, 50)
        item.isFavorited = favoritedRestaurantIds.includes(item.id)
        item.isLiked = likedRestaurantIds.includes(item.id)

        return item
      })

      return res.json(new SuccessResponse({
        restaurants,
        categories: await categoryTask,
        categoryId: req.query.categoryId,
        ...pagination.getPaginationResult(result.count)
      }))
    } catch (err) {
      next(err)
    }
  },

  getFeeds: async (req, res, next) => {
    /*  #swagger.tags = ['Restaurant']
    #swagger.summary = '取得餐廳資訊' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const Limit = 10

      const restaurantFeeds = restService.getFeeds(Limit)
      const commentFeeds = commentService.getFeeds(Limit)

      return res.json(new SuccessResponse({
        restaurants: await restaurantFeeds,
        comments: await commentFeeds
      }))
    } catch (err) {
      next(err)
    }
  },

  getTopRestaurants: async (req, res, next) => {
    /*  #swagger.tags = ['Restaurant']
        #swagger.summary = '取得熱門收藏餐廳' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const restaurants = await restService.getTopRestaurants()
      const favoritedRestaurantIds = req.user.FavoritedRestaurants ? req.user.FavoritedRestaurants.map(f => f.id) : []

      restaurants.forEach(restaurant => {
        restaurant.isFavorited = favoritedRestaurantIds.includes(restaurant.id)
      })

      return res.json(new SuccessResponse({ restaurants }))
    } catch (err) {
      next(err)
    }
  },
  
  getRestaurant: async (req, res, next) => {
    /*  #swagger.tags = ['Restaurant']
        #swagger.summary = '取得餐廳' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '餐廳ID',
          required: true
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      await restService.addViewCount(req.params.id)
      let restaurant = await restService.getRestaurantInfo(req.params.id, req.user.id)
      
      restaurant = restaurant.get()
      restaurant.isFavorited = !!restaurant.isFavorited
      restaurant.isLiked = !!restaurant.isLiked
      restaurant.description = restaurant.description.substring(0, 50)

      return res.json(new SuccessResponse({ restaurant }))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restController
