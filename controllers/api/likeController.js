const likeService = require('../../services/likeService')

const { SuccessResponse } = require('../../data/response')

const likeController = {
  postLike: async (req, res, next) => {
		/*  #swagger.tags = ['Like']
				#swagger.summary = '新增喜歡餐廳'  */
	
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
			await likeService.createLike(req.user.id, req.params.restaurantId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
  },

	deleteLike: async (req, res, next) => {
		/*  #swagger.tags = ['Like']
				#swagger.summary = '移除喜歡餐廳'  */
	
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
			await likeService.removeLike(req.user.id, req.params.restaurantId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
	}
}

module.exports = likeController
