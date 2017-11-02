const http = require('http');

const serve = http.createServer((req, res) => {
    console.log('Get request');

    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hello World');
})
.listen(3000);

console.log('Listening port 3000');