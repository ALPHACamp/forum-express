const db = require('../models')
const Followship = db.Followship
const User = db.User

const followshipService = {
	createFollowship: async (userId, followingId) => {
		if (userId === followingId)
			return

		const follwingUser = await User.findByPk(followingId)

		if (!follwingUser)
			return
		
		await Followship.create({
			followerId: userId,
			followingId
		})
	},

	removeFollowship: async (userId, followingId) => {
		await Followship.destroy({ where: { followerId: userId, followingId }})
	}
}

module.exports = followshipService