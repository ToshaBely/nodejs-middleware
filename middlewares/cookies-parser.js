module.exports = function(req, res, next) {
    req.parsedCookies = cookieToJSON(req.headers.cookie);
    next();
}

function cookieToJSON(cookieStr) {
    if (!cookieStr) {
        return {};
    }
    return cookieStr.split('; ')
        .reduce((result, cookie) => {
            var [key, value] = cookie.split('=');
            return {...result, [key]: value};
        }, {})
}