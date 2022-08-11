module.exports = {
	generalErrorHandler (err, req, res, next) {
		if (err instanceof Error) {
			res.status(500).json({ status: 'error', message: 'Internal server error' })
		} else {
			next(err)
		}
	}
}