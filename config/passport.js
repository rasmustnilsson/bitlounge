const CoinbaseStrategy = require('passport-coinbase').Strategy;
const coinbaseConfig = require('./coinbase/config.js');

const User = require('./models/userModel');
var COINBASE_CLIENT_ID = coinbaseConfig.COINBASE_CLIENT_ID;
var COINBASE_CLIENT_SECRET = coinbaseConfig.COINBASE_CLIENT_SECRET;

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    passport.use('coinbase-login', new CoinbaseStrategy({
    clientID: COINBASE_CLIENT_ID,
    clientSecret: COINBASE_CLIENT_SECRET,
    callbackURL: "http://localhost/auth/coinbase/callback",
    scope: ["user"]
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          User.findOne({
              'coinBaseId': profile.id
          }, function(err, profile) {
              // if there are any errors, return the error before anything else
              if (err) return done(err);
              // if no user is found, return the message
              if (!profile) return done(null, false);
              // all is well, return successful user
              return done(null, {
                  _id: profile._id,
                  coinBaseId: profile.coinBaseId,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  isAdmin: profile.isAdmin,
                  statistics: profile.statistics,
                  reg_date: profile.reg_date,
              });
          });
        });
    }
    ));
    passport.use('coinbase-signup', new CoinbaseStrategy({
    clientID: COINBASE_CLIENT_ID,
    clientSecret: COINBASE_CLIENT_SECRET,
    callbackURL: "http://localhost/signup/coinbase/callback",
    scope: ["user"]
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          User.findOne({
              'coinBaseId': profile.id
          }, function(err, user) {
              // if there are any errors, return the error
              if (err)
                  return done(err);
              // check to see if theres already a user with that username
              if (user) {
                  return done(null, false);
              } else {
                  let user = new User();
                  user.coinBaseId = profile.id;
                  user.save(function(err) {
                      if (err) throw err;
                      return done(null, profile);
                  });
              }
          });
        });
    }
    ));
};
