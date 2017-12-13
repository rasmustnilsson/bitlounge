module.exports = function(app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        return res.redirect('/');
    }
    require('./getRoutes')(app,passport,isLoggedIn);
    require('./postRoutes')(app,passport,isLoggedIn);

};
