import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

import middlewares from './middlewares';
import routes from './routes';

const app = express();

app.use(middlewares.cookiesParser);
app.use(middlewares.queryParser);
app.use(bodyParser.json());

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', routes.passport);
app.use('/api', checkAuth, routes.product);

function checkAuth(req, res, next) {
    console.log('isAuth: ', req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.status(403).end();
}

export default app;