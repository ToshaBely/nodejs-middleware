const fs = require('fs');

module.exports.getAllProducts = () => JSON.stringify(getProductsModel());

module.exports.getSingleProduct = (id) => getProductsModel().find(item => item.id == id) || null;

module.exports.getAllProductReviews = (id) => {
    const product = getProductsModel().find(item => item.id == id) || {reviews: null};

    return JSON.stringify(product.reviews);
}

module.exports.addProduct = (product, callback) => {
    const products = getProductsModel();
    products.push(JSON.parse(product));

    fs.writeFile('models/products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) console.log(err);

        callback();
    });
}

module.exports.getAllUsers = () => JSON.stringify(getUsersModel());

function getProductsModel() {
    return JSON.parse(fs.readFileSync('models/products.json'));
}

function getUsersModel() {
    return JSON.parse(fs.readFileSync('models/users.json'));
}