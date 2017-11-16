const router = require('express').Router();
const controllers = require('../controllers');

router.get('/products', (req, res) => {
    controllers.getAllProducts()
        .then( products => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(products));
        })
        .catch( err => {
            res.status(500).end();
        });
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;

    controllers.getSingleProduct(id)
        .then( product => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(product));
        })
        .catch( err => {
            res.status(500).end();
        });
});

router.get('/products/:id/reviews', (req, res) => {
    const id = req.params.id;

    controllers.getAllProductReviews(id)
        .then( reviews => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(reviews));
        })
        .catch( err => {
            res.status(500).end();
        });
});

router.post('/products', (req, res) => {
    controllers.addProduct(req.body)
        .then( product => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(product));
        })
        .catch( err => {
            res.status(500).end();
        });
});

router.get('/users', (req, res) => {
    controllers.getAllUsers()
        .then( users => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(users));
        })
        .catch( err => {
            res.status(500).end();
        });
});

module.exports = router;