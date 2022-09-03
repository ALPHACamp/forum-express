const Pagination = require('../data/pagination')

const PageLimit = 10

module.exports = {
  getPagination: (page) => {
		return new Pagination(Number(page) || 1, PageLimit)
	}
}