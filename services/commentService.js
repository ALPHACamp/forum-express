const db = require('../models')
const Comment = db.Comment

let commentService = {
  postComment: (req, res, callback, errorHandler) => {
    return Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
      .then((comment) => {
        console.log('comment', comment)
        return callback({
          status: 'success',
          message: 'created new comment successfully',
          RestaurantId: comment.RestaurantId,
          commentId: comment.id
        })
      })
      .catch(err => {
        errorHandler(err)
      })
  },
  deleteComment: (req, res, callback, errorHandler) => {
    return Comment.findByPk(req.params.id)
      .then((comment) => {
        const restaurantId = comment.RestaurantId
        comment.destroy()
          .then((comment) => {
            return callback({ status: 'success', message: 'comment is removed ', RestaurantId: restaurantId })
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

module.exports = commentService
