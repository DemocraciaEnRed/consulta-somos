const express = require('express')
const passport = require('passport')
const session = require('express-session')
const OidcStrategy = require('passport-openidconnect').Strategy
const User = require('lib/models').User
const mongoose = require('mongoose')
const jwt = require('lib/jwt')

const app = module.exports = express()

const {
  SESSION_SECRET,
  OIDC_ISSUER,
  OIDC_AUTH,
  OIDC_TOKEN,
  OIDC_USER,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_CALLBACK
} = process.env

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

function assignProfile (user, profile, accessToken, fn) {
  try {
    user.set('profiles.custom', profile._json)
    user.set('emailValidated', true)

    if (profile._json.given_name) {
      user.set('firstName', profile._json.given_name)
    }

    if (profile._json.amily_name) {
      user.set('lastName', profile._json.amily_name)
    }

    if (profile._json.email) {
      user.set('email', profile._json.email)
    }

    user.save(fn)
  } catch (err) {
    console.error(err)
    return fn(new Error('Error al guardar usuario de Mi Argentina.'), user)
  }
}

// set up passport
passport.use('oidc', new OidcStrategy({
    issuer: OIDC_ISSUER,
    authorizationURL: OIDC_AUTH,
    tokenURL: OIDC_TOKEN,
    userInfoURL: OIDC_USER,
    clientID: OIDC_CLIENT_ID,
    clientSecret: OIDC_CLIENT_SECRET,
    callbackURL: OIDC_CALLBACK,
    scope: 'openid profile'
  }, (issuer, sub, profile, accessToken, refreshToken, done) => {
    profile._json.id = profile.id
    User.findByProvider({ provider: 'twitter', id: profile.id }, function (err, user) {
      if (err) return done(err)

      var email = profile._json.email

      if (!user) {
        if (email) {
          User.findByEmail(email, function (err, userWithEmail) {
            if (err) return done(err)

            if (userWithEmail) {
              assignProfile(userWithEmail, profile, accessToken, done)
            } else {
              assignProfile(new User(), profile, accessToken, done)
            }
          })
        } else {
          assignProfile(new User(), profile, accessToken, done)
        }

        return
      }

      if (user.email !== email) {
        user.set('email', email)
        user.set('profiles.custom.email', email)
      }

      if (user.profiles.custom.deauthorized) {
        user.set('profiles.custom.deauthorized')
      }

      user.isModified() ? user.save(done) : done(null, user)
    })
  }));

app.get('/login', passport.authenticate('oidc'));

app.use('/authorization-code/callback',
  passport.authenticate('oidc', { failureRedirect: '/error' }),
  (req, res) => {
    jwt.setUserOnCookie(req.user, res)
    res.redirect('/');
  }
);
