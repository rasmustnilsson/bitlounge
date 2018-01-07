let envData = {
    vue: 'vue.js',
    port: ':3000',
};

if(process.env.NODE_ENV == 'production') {
    envData.vue = 'vue.min.js';
    envData.port = null;
}

module.exports = {
    get: function(req, data) {
        if(!req) return user = { isLoggedIn: false };
        let J = {
            vue: envData.vue,
            port: envData.port,
            path: req.route.path,
        };
        if(data) {
            J.pageData = data.pageData;
            J.pageId = data.pageId;
        }
        if(req.session.user) {
            J.isLoggedIn = true;
        } else {
            J.isLoggedIn = false;
        }
        return J;
    }
}
