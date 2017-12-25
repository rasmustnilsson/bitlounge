const pugData = require('./../views/pugData.js');
const { HLTV } = require('hltv')

var stringify = require('js-stringify');


module.exports = function(app,passport,isLoggedIn) {
    app.get('/', function(req, res, next) {
        res.render('front_page', pugData.get(req));
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/profile/:profileId',isLoggedIn,((req, res, next) => {
        res.render('profile_page', pugData.get(req));
    }));
    app.get('/player/:playerId', function(req,res) {
        HLTV.getPlayer({id: req.params.playerId}).then(player => {
            res.render('player_page', pugData.get(req, {
                pageData: stringify(player),
                pageId: req.params.playerId,
            }));
        })
    })
    app.get('/team/:id', function(req,res) {
        HLTV.getTeam({id: req.params.id}).then(team => {
            res.render('team_page', pugData.get(req, {
                pageData: stringify(team),
                pageId: req.params.id,
            }));
        })
    })
    app.get('/match/:matchId',((req, res, next) => {
        HLTV.getMatch({id: req.params.matchId}).then(match => {
            res.render('match_page', pugData.get(req, {
                pageData: stringify(match),
                pageId: req.params.matchId,
            }));
        })
    }));
    app.get('/auth/coinbase',passport.authenticate('coinbase-login'));
    app.get('/auth/coinbase/callback', passport.authenticate('coinbase-login', {
        failureRedirect: '/?loginerror=true'
    }), function(req, res) {
        res.redirect('/');
    });
}
