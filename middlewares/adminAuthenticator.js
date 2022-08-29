const { ErrorResponse } = require('../data/response')

module.exports = {
	adminAuthenticator: (req, res, next) => {
		if (req.user) {
			if (req.user.isAdmin) { return next() }
			return res.json(new ErrorResponse('permission denied'))
		} else {
			return res.json(new ErrorResponse('permission denied'))
		}
	}
}