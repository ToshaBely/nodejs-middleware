const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        res.status(403).send({ success: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(403).send({ success: false, message: 'Wrong token.' });
            } else {
                req.user = { id: decoded.id, name: decoded.name };
                next();
            }
        });
    }
}