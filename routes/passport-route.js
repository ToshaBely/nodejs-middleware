const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const router = require('express').Router();
const fs = require('fs');

const controller = require('../controllers').mongoController;

passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password', session: false, passReqToCallback: true }, 
    (req, login, password, done) => {
        controller.getUserByLogin(login)
            .then( user => {
                if (!user || user.password !== password) return done(null, false, { message: 'Wrong credentionals' });
                return done(null, user);
            })
            .catch( err => {
                return done(err);
            });
    })
);

passport.use(new TwitterStrategy({
    consumerKey: 'HksS63u3WQFJ37sqlLENaxAmo',
    consumerSecret: '8VRr3ARMcTb8kpeUWrP7Fmh79S2eEQmsbCcIqnmxJHbrt5vyXX',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    controller.getUserByAuthStrategy('twitter', profile.id)
        .then( user => {
            if(user) return done(null, user);

            controller.createUserByAuthStrategy('twitter', profile.id, profile.displayName)
                .then( user => {
                    return done(null, user);
                });
        })
        .catch( err => {
            return done(err);
        });
  }
));

passport.use(new GoogleStrategy({
    clientID: '33117555504-43bq1l2up7ldehckh2tjl4ga38tshscc.apps.googleusercontent.com',
    clientSecret: 'XnTc1H1JXvzgeYYU86_M1Khg',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      controller.getUserByAuthStrategy('google', profile.id)
        .then( user => {
            if(user) return done(null, user);

            controller.createUserByAuthStrategy('google', profile.id, profile.name.givenName + ' ' + profile.name.familyName)
                .then( user => {
                    return done(null, user);
                });
        })
        .catch( err => {
            return done(err);
        });
  }
));

passport.serializeUser(function(user, callback) {
    callback(null, user._id);
  });
  
passport.deserializeUser(function(id, callback) {
    controller.getUserById(id)
        .then( user => {
            callback(null, user);
        });
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if( !user ) return res.status(401).end(info.message);
        res.json(user);
    })(req, res, next);
});

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter'), (req, res) => {
    res.json(req.user);
});


router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.json(req.user);
});

module.exports = router;
