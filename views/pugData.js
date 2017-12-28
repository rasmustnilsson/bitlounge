module.exports = {
    get: function(req, data) {
        if(!req) return user = {id: -1 };
        let J = {
            path: req.route.path,
        };
        if(data) {
            J.pageData = data.pageData;
            J.pageId = data.pageId;
        }
        if(req.session.user) {
            J.user = req.session.user;
        } else {
            J.user = {};
            J.user.id = -1;
        }
        return J;
    }
}
