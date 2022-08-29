const likeService = require('../../services/likeService')

const { SuccessResponse } = require('../../data/response')

const likeController = {
  postLike: async (req, res, next) => {
		/*  #swagger.tags = ['Like']
				#swagger.summary = 'Add liked restaurant to user'  */
	
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
			await likeService.createLike(req.user.id, req.params.restaurantId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
  },

	deleteLike: async (req, res, next) => {
		/*  #swagger.tags = ['Like']
				#swagger.summary = 'Remove liked restaurant from user'  */
	
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
			await likeService.removeLike(req.user.id, req.params.restaurantId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
	}
}

module.exports = likeController
