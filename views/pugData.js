let envData = {
    vueSrc: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    vueIntegrity: 'sha256-pU9euBaEcVl8Gtg+FRYCtin2vKLN8sx5/4npZDmY2VA=',
    port: ':3000',
};

if(process.env.NODE_ENV == 'production') {
    envData.vueSrc = 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js';
    envData.vueIntegrity = 'sha256-1Q2q5hg2YXp9fYlM++sIEXOcUb8BRSDUsQ1zXvLBqmA=';
    envData.port = null;
}

module.exports = {
    get: function(req, data) {
        if(!req) return user = { isLoggedIn: false };
        let J = {
            vueSrc: envData.vueSrc,
            vueIntegrity: envData.vueIntegrity,
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
