module.exports = function(app,passport,isLoggedIn) {
    app.get('/', function(req, res, next) {
        if(!req.isAuthenticated()) return res.render('login_page', { query: req.query });
        res.render('front_page', { req: req });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/profile/:profileId',isLoggedIn,((req, res, next) => {
        res.render('profile_page', { req: req });
    }));
    app.get('/match/:match',((req, res, next) => {
        res.render('match_page', { id: req.params.match });
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
