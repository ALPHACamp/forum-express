const commentService = require('../../services/commentService.js')

let commentController = {
  postComment: (req, res, next) => {
    commentService.postComment(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  },
  deleteComment: (req, res, next) => {
    commentService.deleteComment(req, res, (data) => {
      return res.json(data)
    }, (err) => {
      next(err)
    })
  }
}

module.exports = commentController
