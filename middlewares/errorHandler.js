const { ErrorResponse } = require('../data/response')

module.exports = {
	generalErrorHandler (err, req, res, next) {
		if (err instanceof Error) {
			res.status(500).json(new ErrorResponse('internal server error'))
		} else {
			next(err)
		}
	}
}