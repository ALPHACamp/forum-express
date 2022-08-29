const commentService = require('../../services/commentService')

const { SuccessResponse } = require('../../data/response')

const commentController = {
  postComment: async (req, res, next) => {
    /*  #swagger.tags = ['Comment']
        #swagger.summary = 'Leave comment' */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    example: 'new comment'
                  },
                  RestaurantId: {
                    type: 'integer',
                    example: 1
                  }
                },
                required: ['email', 'password', 'passwordCheck']
              }
            }
          }
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const comment = await commentService.createComment({
        text: req.body.text,
        RestaurantId: req.body.RestaurantId,
        UserId: req.user.id
      })

      return res.json(new SuccessResponse({ id: comment.id, RestaurantId: comment.RestaurantId }, 'new comment created successfully'))
    } catch (err) {
      next(err)
    }
  },

  deleteComment: async (req, res, next) => {
    /*  #swagger.tags = ['Comment']
        #swagger.summary = 'Remove comment' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: 'Comment ID',
          required: true
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      await commentService.deleteComment(req.params.id)

      return res.json(new SuccessResponse(null, 'comment is removed'))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = commentController
