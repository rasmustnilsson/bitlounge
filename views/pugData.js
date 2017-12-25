module.exports = {
    get: function(req, data) {
        let J = {
            signuperror: req.query.signuperror,
            loginerror: req.query.loginerror,
            path: req.route.path,
        };
        if(data) {
            J.pageData = data.pageData;
            J.pageId = data.pageId;
        }
        if(req.user) {
            J.user = req.user;
        } else {
            J.user = {};
            J.user.id = 0;
        }
        return J;
    }
}
