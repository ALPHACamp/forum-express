
class Pagination {
	constructor(page, limit) {
		this.page = page
		this.limit = limit
	}

	get pagination() {
		return { offset: (this.page - 1) * this.limit, limit: this.limit }
	}

	getPaginationResult(dataCount) {
		const totalPages = Math.ceil(dataCount / this.limit)
		const availablePages = Array.from({ length: totalPages }).map((_, index) => index + 1)

		return {
			page: this.page,
			totalPage: availablePages,
			prev: this.page - 1 < 1 ? 1 : this.page - 1,
			next: this.page + 1 > totalPages ? totalPages : this.page + 1
		}
	}
}

module.exports = Pagination