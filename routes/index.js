const router = require('express').Router();
const controllers = require('../controllers');

router.get('/products', controllers.getAllProducts);
router.get('/products/:id', controllers.getSingleProduct);
router.get('/products/:id/reviews', controllers.getAllProductReviews);
router.post('/products', controllers.createProduct);
router.get('/users', controllers.getAllUsers);

module.exports = router;