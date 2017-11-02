const router = require('express').Router();
const controllers = require('../controllers');

router.get('/products', (req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(controllers.getAllProducts());
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(controllers.getSingleProduct(id)));
});

router.get('/products/:id/reviews', (req, res) => {
    const id = req.params.id;

    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(controllers.getAllProductReviews(id));
});

router.post('/products', (req, res) => {
    let body = [];
    
    req.on('data', (chunk) => {
        body.push(chunk);
    });
    
    req.on('end', () => {
        body = Buffer.concat(body).toString();

        controllers.addProduct(body, () => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(body);
        });
    });
});

router.get('/users', (req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(controllers.getAllUsers());
});

module.exports = router;