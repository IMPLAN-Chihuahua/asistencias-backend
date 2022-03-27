
const paginate = (req, res, next) => {
	let { page, perPage } = req.query;
	if ((page && isNaN(page)) ||
		(perPage && isNaN(perPage))) {
		return res.status(422).json({ message: 'Invalid pagination values' })
	}
	page = parseInt(page) || 1;
	perPage = parseInt(perPage) || 25;
	perPage = perPage <= 0 ? 1 : perPage;
	req.page = page;
	req.offset = (page - 1) * perPage;
	req.limit = perPage;

	next();
}

module.exports = { paginate };