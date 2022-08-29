const { QueryTypes } = require('sequelize')
const { sequelize } = require('../models')
const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant

const userService = {
  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email: email }})
  },

	createUser: async (user) => {
		await User.create({
			name: user.name,
			email: user.email,
			password: user.password
		})
	},

	getUserProfile: async (id) => {
		let user = await User.findByPk(id, {
			attributes: ['id', 'name', 'email', 'isAdmin', 'image'],
			include: [
        {
					model: Restaurant,
          as: 'FavoritedRestaurants',
          attributes: ['id', 'name', 'image']
        },
        {
					model: User,
					as: 'Followers',
					attributes: ['id', 'name', 'email', 'image']
				},
        {
					model: User,
					as: 'Followings',
					attributes: ['id', 'name', 'email', 'image']
				}
			]
		})

		if (!user)
			return {}

		// in order to set custom property of CommentsRestaurants
		user = user.get()
		user.CommentsRestaurants = await sequelize.query(
			`
				SELECT id, name, image
				FROM Restaurants
				WHERE id IN (
					SELECT DISTINCT(RestaurantId)
					FROM Comments
					WHERE UserId = :userId
				)
			`,
			{
				replacements: { userId: id },
				type: QueryTypes.SELECT
			}
		)
		
		return user
	},

	updateUser: async (user) => {
		const target = await User.findByPk(user.id)

		if (!target)
			return
		
		target.name = user.name
		if (user.image)
			target.image = user.image
		
		await target.save()

		return target.get()
  },

	getTopUsers: async () => {
		return await sequelize.query(
			`
				SELECT id, name, image, COALESCE(FollowerCount, 0) AS FollowerCount
				FROM Users u LEFT JOIN
						(
							SELECT followingId, COUNT(followerId) AS FollowerCount
							FROM Followships
							GROUP BY followingId
						) f ON (u.id = f.followingId)
				ORDER BY FollowerCount DESC
			`,
			{ type: QueryTypes.SELECT }
		)
	},

	getUsers: async () => {
		return await User.findAll({ attributes: ['id', 'name', 'email', 'isAdmin'] })
	},

	updateUserRole: async (user) => {
		const target = await User.findByPk(user.id)

		if (!target)
			return

		target.isAdmin = user.isAdmin
		
		await target.save()
	}
}

module.exports = userService