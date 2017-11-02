const fs = require('fs');

module.exports.getAllProducts = (req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(getProductsModel()));
}

module.exports.getSingleProduct = (req, res) => {
    const id = req.params.id;
    const product = getProductsModel().find(item => item.id == id);

    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(product));
}

module.exports.getAllProductReviews = (req, res) => {
    const id = req.params.id;
    const product = getProductsModel().find(item => item.id == id);

    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(product.reviews));
}

module.exports.createProduct = (req, res) => {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        const products = getProductsModel();
        products.push(JSON.parse(body));

        fs.writeFile('models/products.json', JSON.stringify(products, null, 2), (err) => {
            if (err) console.log(err);
            
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(body);
        });
    })
}

module.exports.getAllUsers = (req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(getUsersModel()));
}

function getProductsModel() {
    return JSON.parse(fs.readFileSync('models/products.json'));
}

function getUsersModel() {
    return JSON.parse(fs.readFileSync('models/users.json'));
}