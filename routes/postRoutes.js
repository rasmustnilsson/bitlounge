const db = require('../config/database/queries');
const mapsTranslator = require('../config/mapsTranslator');
const { HLTV } = require('hltv')

module.exports = function(app,passport,isLoggedIn) {
    app.post('/getMatches', function(req,res,next) {
        HLTV.getMatches().then((matches) => {
            var list = [];
            for(let i = 0; i < matches.length; i++) {
                if(matches[i].team1 != undefined && matches[i].team2 != undefined) {
                    var match = matches[i];
                    for(map in match.maps) {
                        match.maps[map] = mapsTranslator[match.maps[map]];
                    }
                    if(match.map) {
                        match.maps = [mapsTranslator[match.map]];
                    }
                    if(!match.maps && !match.maps) {
                        match.maps = ['undefined']
                    }
                    list.push(match);
                }
            }
            res.send(list);
        })
    })
    app.post('/getMatch/:matchId', function(req,res) {
        HLTV.getMatch({id: req.params.matchId}).then(match => {
            res.send(match)
        })
    })
    app.post('/auth/coinbase',passport.authenticate('coinbase-login'));
    app.post('/signup/coinbase',passport.authenticate('coinbase-signup'));

}
