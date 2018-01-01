let scripts = {
    vue: 'vue.js',
};

if(process.env.NODE_ENV) {
    scripts.vue = 'vue.min.js';
}

module.exports = {
    get: function(req, data) {
        if(!req) return user = {isLoggedIn: false };
        let J = {
            vue: scripts.vue,
            path: req.route.path,
        };
        if(data) {
            J.pageData = data.pageData;
            J.pageId = data.pageId;
        }
        if(req.session.user) {
            J.user = req.session.user;
            J.isLoggedIn = true;
        } else {
            J.user = {};
            J.isLoggedIn = false;
        }
        return J;
    }
}
