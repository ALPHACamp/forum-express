class Response {
	constructor(status, data, message) {
		Object.assign(this, data)
		this.status = status
		this.message = message
	}
}

class SuccessResponse extends Response {
	constructor(data, message) {
		super('success', data, message)
	}
}

class ErrorResponse extends Response {
	constructor(message) {
		super('error', null, message)
	}
}

module.exports = {
	SuccessResponse,
	ErrorResponse
}