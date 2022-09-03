const followshipService = require('../../services/followshipService')

const { SuccessResponse } = require('../../data/response')

const followshipController = {
  postFollowship: async (req, res, next) => {
		/*  #swagger.tags = ['Followship']
				#swagger.summary = '追隨使用者'  */
	
		/*  #swagger.parameters['userId'] = {
					in: 'path',
					description: '欲追隨使用者ID',
          schema: {
            type: 'integer'
          },
					required: true
		} */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
		try {
			await followshipService.createFollowship(req.user.id, Number(req.params.userId))

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
  },

	deleteFollowship: async (req, res, next) => {
		/*  #swagger.tags = ['Followship']
				#swagger.summary = '取消追隨使用者'  */
	
		/*  #swagger.parameters['userId'] = {
					in: 'path',
					description: '欲取消追隨使用者ID',
          schema: {
            type: 'integer'
          },
					required: true
		} */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
		try {
			await followshipService.removeFollowship(req.user.id, req.params.userId)

			return res.json(new SuccessResponse())
		} catch (err) {
			next(err)
		}
	}
}

module.exports = followshipController
