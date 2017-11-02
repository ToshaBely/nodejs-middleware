const queryString = require('querystring');
const url = require('url');

module.exports = function(req, res, next) {
    req.parsedQuery = queryString.parse(url.parse(req.url).query);
    next();
}