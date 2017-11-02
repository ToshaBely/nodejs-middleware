import express from 'express';
import middlewares from './middlewares';
import routes from './routes';

const app = express();

app.use(middlewares.cookiesParser);
app.use(middlewares.queryParser);

app.use('/api', routes);

app.get('/test', (req, res) => {
    console.log('from request: ', req.parsedCookies);
    
    res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'});
    res.write(`Parsed cookies: ${JSON.stringify(req.parsedCookies)}\n`);
    res.write(`Parsed query: ${JSON.stringify(req.parsedQuery)}\n`);
    res.end();
});

export default app;