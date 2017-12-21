module.exports = {
    get: function(req) {
        let J = {
            signuperror: req.query.signuperror,
            loginerror: req.query.loginerror,
            path: req.route.path,
        };
        if(req.route.path = '/match/:matchId') {
            J.matchId = req.params.matchId;
        }
        if(req.route.path = '/player/:playerId') {
            J.playerId = req.params.playerId;
        }
        if(req.user) {
            J.user = req.user;
        }
        return J;
    }
}
