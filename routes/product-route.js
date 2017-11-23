const router = require('express').Router();
const controller = require('../controllers').mongoController;

router.get('/products', (req, res) => {
    controller.getAllProducts()
        .then(products => res.json(products))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;

    controller.getSingleProduct(id)
        .then(product => res.json(product))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.get('/products/:id/reviews', (req, res) => {
    const id = req.params.id;

    controller.getAllProductReviews(id)
        .then(reviews => res.json(reviews))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.post('/products', (req, res) => {
    controller.addProduct(req.body)
        .then(product => res.json(product))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.delete('/products/:id', (req, res) => {
    const id = req.params.id;

    controller.deleteProduct(id)
        .then(data => res.json({success: true}))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.get('/users', (req, res) => {
    controller.getAllUsers()
        .then(users => res.json(users))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    controller.deleteUser(id)
        .then(data => res.json({success: true}))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.get('/city', (req, res) => {
    controller.getRandomCity()
        .then(city => res.json(city))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.get('/cities', (req, res) => {
    controller.getAllCities()
        .then(cities => res.json(cities))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.delete('/cities/:id', (req, res) => {
    const id = req.params.id;

    controller.deleteCity(id)
        .then(data => res.json({success: true}))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.post('/cities', (req, res) => {
    controller.addCity(req.body)
        .then(city => res.json(city))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

router.put('/cities/:id', (req, res) => {
    const id = req.params.id;

    controller.updateOrCreateCity(id, req.body)
        .then(city => res.json(city))
        .catch(err => res.status(500).end(JSON.stringify(err)));
});

module.exports = router;