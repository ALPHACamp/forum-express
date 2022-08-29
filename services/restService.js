const { QueryTypes } = require('sequelize')
const { sequelize } = require('../models')
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const restaurantService = {
	getRestaurants: async () => {
    return await Restaurant.findAll({
			attributes: ['id', 'name'],
			include: { model: Category, attributes: ['id', 'name']}
		})
  },

	getRestaurant: async (id) => {
		return await Restaurant.findByPk(id, {
			attributes: ['id', 'name', 'image', 'opening_hours', 'tel', 'address', 'description'],
			include: { model: Category, attributes: ['id', 'name']}
		})
	},

	getRestaurantsAndCount: async (queryOptions) => {
		let options = {
			include: { model: Category, attributes: ['id', 'name'] },
			attributes: ['id', 'name', 'description', 'image']
		}

		if (queryOptions.condition) {
			options.where = queryOptions.condition
		}
		if (queryOptions.pagination) {
			options = Object.assign(options, { ...queryOptions.pagination })
		}

		return await Restaurant.findAndCountAll(options)
	},
	
	getFeeds: async (limit) => {
		return await Restaurant.findAll({
			attributes: ['id', 'name', 'description', 'image', 'createdAt'],
			limit,
			order: [['createdAt', 'DESC']],
			include: { model: Category, attributes: ['id', 'name']}
		})
	},
	
	getTopRestaurants: async () => {
		return await sequelize.query(
			`
				SELECT id, name, description, image, COALESCE(FavoriteCount, 0) AS FavoriteCount
				FROM Restaurants r LEFT JOIN
						(
							SELECT RestaurantId, COUNT(UserId) AS FavoriteCount
							FROM Favorites
							GROUP BY RestaurantId
						) f ON (r.id = f.RestaurantId)
				ORDER BY FavoriteCount DESC
			`,
			{ type: QueryTypes.SELECT }
		)
	},

	addViewCount: async (id) => {
		await Restaurant.update({ viewCounts: sequelize.literal('viewCounts + 1') }, { where: { id }})
	},

	getRestaurantInfo: async (id, userId) => {
		return await Restaurant.findByPk(id, {
			attributes: [
				'id',
				'name',
				'image',
				'opening_hours',
				'tel',
				'address',
				'description',
				'viewCounts',
				[
					sequelize.literal(`
						EXISTS(SELECT * FROM Favorites WHERE RestaurantId = Restaurant.id AND UserId = :userId)
					`),
					'isFavorited'
				],
				[
					sequelize.literal(`
						EXISTS(SELECT * FROM Likes WHERE RestaurantId = Restaurant.id AND UserId = :userId)
					`),
					'isLiked'
				]
			],
			include: [
				{ model: Category, attributes: ['id', 'name']},
				{ model: Comment,
					attributes: ['id', 'text', 'createdAt'],
					include: {
						model: User, attributes: ['id', 'name']
					}
				}
			],
			replacements: { userId }
		})
	},

	createRestaurant: async (restaurant) => {
		return await Restaurant.create({
			name: restaurant.name,
			tel: restaurant.tel,
			address: restaurant.address,
			opening_hours: restaurant.opening_hours,
			description: restaurant.description,
			image: restaurant.image,
			CategoryId: restaurant.categoryId
		})
	},

	updateRestaurant: async (restaurant) => {
		const target = await Restaurant.findByPk(restaurant.id)

		if (!target)
			return {}
		
		target.name = restaurant.name
		target.tel = restaurant.tel
		target.address = restaurant.address
		target.opening_hours = restaurant.opening_hours
		target.description = restaurant.description
		target.CategoryId = restaurant.categoryId

		if (restaurant.image)
			target.image = restaurant.image

		await target.save()

		return target.get()
	},

	deleteRestaurant: async (id) => {
		const delRestauranTask = Restaurant.destroy({ where: { id }})
		const delCommentTask = Comment.destroy({ where: { RestaurantId: id }})

		await delRestauranTask
		await delCommentTask
	}
}

module.exports = restaurantService