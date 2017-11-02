const http = require('http');

const serve = http.createServer()
    .on('request', (req, res) => {
        console.log('Get request ');

        req.pipe(res);
    })
    .listen(3000);

console.log('Listening port 3000');