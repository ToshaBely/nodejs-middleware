const http = require('http');

const serve = http.createServer((req, res) => {
    console.log('Get request');
    
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(product));
})
.listen(3000);

console.log('Listening port 3000');

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
}