const CoinbaseStrategy = require('passport-coinbase').Strategy;
const coinbaseConfig = require('./coinbase/config.js');
const dynamoose = require('dynamoose');
const User = require('./models/User');

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
    scope: ["user"],
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            User.get({id:profile.id}, (err,user) => {
                if (err) return done(err);
                // if no user is found, creates new user
                if (!user) {
                    var user = new User({
                        id: profile.id,
                        name: profile.displayName,
                        displayName: profile.displayName,
                    });
                    user.save(function(err) {
                        if(err) throw err;
                        return done(null, {
                            id: profile.id,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            isAdmin: profile.isAdmin,
                            statistics: profile.statistics,
                            name: profile.displayName,
                            displayName: profile.displayName,
                            reg_date: profile.reg_date,
                        });
                    })
                } else {
                    return done(null, {
                        id: user.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        name: user.name,
                        displayName: user.displayName,
                        isAdmin: user.isAdmin,
                        statistics: user.statistics,
                        reg_date: user.reg_date,
                    });
                }
            })
        });
    }
    ));
};
