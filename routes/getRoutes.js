const db = require('../config/database/queries');
module.exports = function(app,passport,isLoggedIn) {
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
    app.get('/', function(req, res, next) {
        if(!req.isAuthenticated()) return res.render('login_page');
        res.render('front_page', { req: req });
    });
}
