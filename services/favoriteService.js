const db = require('../models')
const Favorite = db.Favorite
const Restaurant = db.Restaurant

const favoriteService = {
	createFavorite: async (userId, restaurantId) => {
		const restaurant = await Restaurant.findByPk(restaurantId)

		if (!restaurant)
			return
		
		await Favorite.create({
			UserId: userId,
			RestaurantId: restaurantId
		})
	},

	removeFavorite: async (userId, restaurantId) => {
		await Favorite.destroy({ where: { UserId: userId, RestaurantId: restaurantId }})
	}
}

module.exports = favoriteService