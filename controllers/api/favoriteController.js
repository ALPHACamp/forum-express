const favoriteService = require('../../services/favoriteService')

const { SuccessResponse } = require('../../data/response')

const favoriteController = {
  postFavorite: async (req, res, next) => {
		/*  #swagger.tags = ['Favorite']
				#swagger.summary = '加入收藏餐廳'  */
	
		/*  #swagger.parameters['restaurantId'] = {
					in: 'path',
					description: '餐廳ID',
          schema: {
            type: 'integer'
          },
					required: true
		} */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
		try {
			await favoriteService.createFavorite(req.user.id, req.params.restaurantId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
  },

	deleteFavorite: async (req, res, next) => {
		/*  #swagger.tags = ['Favorite']
				#swagger.summary = '移除收藏餐廳'  */
	
		/*  #swagger.parameters['restaurantId'] = {
					in: 'path',
					description: '餐廳ID',
          schema: {
            type: 'integer'
          },
					required: true
		} */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
		try {
			await favoriteService.removeFavorite(req.user.id, req.params.restaurantId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
	}
}

module.exports = favoriteController
