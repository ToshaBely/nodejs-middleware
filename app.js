import express from 'express';
import middlewares from './middlewares';
import routes from './routes';

import bodyParser from 'body-parser';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth';

const app = express();

app.use(middlewares.cookiesParser);
app.use(middlewares.queryParser);
app.use(bodyParser.json());

passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password', session: false, passReqToCallback: true }, 
    (req, login, password, done) => {
        const checkResult = authorization(login, password);

        if(!checkResult.success) {
            return done(null, false, { message: checkResult.message });
        }

        req.user = checkResult.user;
        return done(null, checkResult.user);
    })
);

passport.use(new FacebookStrategy(
    function(accessToken, refreshToken, profile, done) {
        done(null, {id: 'test'});
    })
);

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
passport.deserializeUser(function(id, callback) {
    const user = JSON.parse(fs.readFileSync('./mock-creds.json')).find(item => item.id === id);
    cb(null, user);
});

app.use(passport.initialize());

app.post('/auth', passport.authenticate('local'), (req, res) => {
    const token = jwt.sign({ id: req.user.id, name: req.user.username }, 'secret', { expiresIn: 120 });
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify({ success: true, token }));
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.use('/api', middlewares.checkToken, routes);

// app.post('/jwt-auth', (req, res) => {
//     const checkResult = authorization(req.body.login, req.body.password);
    
//     if (!checkResult.success) {
//         res.status(403).send(checkResult);
//     } else {
        // const token = jwt.sign({ id: checkResult.user.id, name: checkResult.user.username }, 'secret', { expiresIn: 120 });
        // res.writeHead(200, {'Content-type': 'application/json'});
        // res.end(JSON.stringify({ success: true, token }));
//     }
// });

function authorization(login, password) {
    const user = JSON.parse(fs.readFileSync('./mock-creds.json')).find(item => item.login === login);
    
    if (!user || user.password !== password) {
        return { success: false, message: 'Bad login or password' };
    } else {
        return { success: true, user}
    }
}

export default app;