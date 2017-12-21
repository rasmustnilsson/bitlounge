const pugData = require('./../views/pugData.js');

module.exports = function(app,passport,isLoggedIn) {
    app.get('/', function(req, res, next) {
        if(!req.isAuthenticated()) return res.render('login_page', pugData.get(req));
        res.render('front_page', pugData.get(req));
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/player/:playerId', function(req,res) {
        res.render('player_page', pugData.get(req));
    })
    app.get('/profile/:profileId',isLoggedIn,((req, res, next) => {
        res.render('profile_page', pugData.get(req));
    }));
    app.get('/match/:matchId',((req, res, next) => {
        res.render('match_page', pugData.get(req));
    }));
    app.get('/auth/coinbase/callback', passport.authenticate('coinbase-login', {
        failureRedirect: '/?loginerror=true'
    }), function(req, res) {
        res.redirect('/');
    });
    app.get('/signup/coinbase/callback', passport.authenticate('coinbase-signup', {
        failureRedirect: '/?signuperror=true'
    }), function(req, res) {
        res.redirect('/');
    });
}
