const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

imgur.setClientID(IMGUR_CLIENT_ID)

module.exports = {
  uploadImage: (file) => {
		return new Promise((resolve, reject) => {
			try {
				if (file) {
					imgur.upload(file.path, (err, img) => {
						if (err) {
							return reject(err)
						}

						return resolve(img.data.link)
					})
				}
			} catch (err) {
				reject(err)
			}
		})
	}
}