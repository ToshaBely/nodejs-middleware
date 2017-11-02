const http = require('http');
const fs = require('fs');

const serve = http.createServer((req, res) => {
    console.log('Get request');
    
    res.writeHead(200, {'Content-type': 'text/html'});
    fs.createReadStream('index.html').pipe(res);
})
.listen(3000);

console.log('Listening port 3000');