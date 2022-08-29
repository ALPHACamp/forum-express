const favoriteService = require('../../services/favoriteService')

const { SuccessResponse } = require('../../data/response')

const favoriteController = {
  postFavorite: async (req, res, next) => {
		/*  #swagger.tags = ['Favorite']
				#swagger.summary = 'Add favorite restaurant to user'  */
	
		/*  #swagger.parameters['restaurantId'] = {
					in: 'path',
					description: 'Restaurant ID',
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
				#swagger.summary = 'Remove favorite restaurant from user'  */
	
		/*  #swagger.parameters['restaurantId'] = {
					in: 'path',
					description: 'Restaurant ID',
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
