const db = require('../models')
const Like = db.Like
const Restaurant = db.Restaurant

const likeService = {
	createLike: async (userId, restaurantId) => {
		const restaurant = await Restaurant.findByPk(restaurantId)
		if (!restaurant)
			return
		
		const target = await Like.findOne({ where: { UserId: userId, RestaurantId: restaurantId }})
		if (target)
			return
		
		await Like.create({
			UserId: userId,
			RestaurantId: restaurantId
		})
	},

	removeLike: async (userId, restaurantId) => {
		await Like.destroy({ where: { UserId: userId, RestaurantId: restaurantId }})
	}
}

module.exports = likeService