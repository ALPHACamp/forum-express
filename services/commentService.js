const db = require('../models')
const Comment = db.Comment
const Restaurant = db.Restaurant
const User = db.User

const commentService = {
  createComment: async (comment) => {
    return await Comment.create(comment)
  },

  deleteComment: async (id) => {
    await Comment.destroy({ where: { id }})
  },

  getFeeds: async (limit) => {
    return await Comment.findAll({
      attributes: ['id', 'text', 'createdAt'],
      limit,
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Restaurant, attributes: ['id', 'name', 'image'] }
      ]
    })
  }
}

module.exports = commentService
