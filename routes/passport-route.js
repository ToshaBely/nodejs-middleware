const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const router = require('express').Router();
const fs = require('fs');

passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password', session: false, passReqToCallback: true }, 
    (req, login, password, done) => {

        const user = JSON.parse(fs.readFileSync('mock-creds.json')).find(item => item.login === login);
        
        if (!user || user.password !== password) {
            return done(null, false, { message: 'Wrong credentionals' });
        } else {
            return done(null, user);
        }
    })
);

passport.use(new TwitterStrategy({
    consumerKey: 'HksS63u3WQFJ37sqlLENaxAmo',
    consumerSecret: '8VRr3ARMcTb8kpeUWrP7Fmh79S2eEQmsbCcIqnmxJHbrt5vyXX',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    const users = getUsers();
    let user = users.find(item => item.id === 'twitter-' + profile.id);

    if (!user) {
      user = saveUserFromTwitter(profile);
    }

    return done(null, user);
  }
));

passport.use(new GoogleStrategy({
    clientID: '33117555504-43bq1l2up7ldehckh2tjl4ga38tshscc.apps.googleusercontent.com',
    clientSecret: 'XnTc1H1JXvzgeYYU86_M1Khg',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      const users = getUsers();
      let user = users.find(item => item.id === 'google-' + profile.id);

      if (!user) {
        user = saveUserFromGoogle(profile);
      }

      return done(null, user);
  }
));

passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });
  
passport.deserializeUser(function(id, callback) {
    const user = getUsers().find(item => item.id === id);
    callback(null, user);
});

router.post('/', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
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

function getUsers() {
    return JSON.parse(fs.readFileSync('./mock-creds.json'));
}

function saveUserFromTwitter(profile) {
    console.log(profile);

    const users = getUsers();
    const user = {
        id: 'twitter-' + profile.id,
        username: profile.displayName
    };

    users.push(user);
    fs.writeFileSync('./mock-creds.json', JSON.stringify(users, null, 4));

    return user;
}

function saveUserFromGoogle(profile) {
    const users = getUsers();
    const user = {
        id: 'google-' + profile.id,
        username: profile.name.givenName + ' ' + profile.name.familyName
    };

    users.push(user);
    fs.writeFileSync('./mock-creds.json', JSON.stringify(users, null, 4));

    return user;
}
