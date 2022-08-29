const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
	info: {
		version: '1.0.0',
		title: 'Forum API',
	},
	basePath: '/',
	consumes: ['application/json', 'multipart/form-data'],
	produces: ['application/json'],
	tags: [
		{ name: 'User' },
		{ name: 'Favorite' },
		{ name: 'Like' },
		{ name: 'Followship' },
		{ name: 'Comment' },
		{ name: 'Restaurant' },
		{ name: 'Admin' }
	],
	securityDefinitions: {
		bearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT'
		}
	},
	definitions: {
		GeneralResponse: {
			status: 'success',
			message: 'failure message'
		}
	},
	components: {
		schemas: {
			Restaurant: {
				name: 'new restaurant',
				tel: '01-0000-0000',
				address: '830 Adress Dist.',
				opening_hours: '09:00-21:00',
				description: 'restaurant description',
				image: {
					type: 'string',
					format: 'binary'
				},
				CategoryId: 1
			}
		}
	}
}
const output = './swagger.json'
const endpoints = ['./app.js']

swaggerAutogen(output, endpoints, doc)