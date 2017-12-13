const db = require('../config/database/queries');
const mapsTranslator = require('../config/mapsTranslator');
const { HLTV } = require('hltv')

module.exports = function(app,passport,isLoggedIn) {
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/err', // redirect back to the signup page if there is an error
    }));
    app.post('/getMatches', function(req,res,next) {
        HLTV.getMatches().then((matches) => {
            var list = [];
            for(match in matches) {
                if(matches[match].team1 && matches[match].team2) {
                    if(matches[match].maps == undefined ) {
                        matches[match].maps = ['undefined'];
                    } else if(matches[match].maps.length > 1) {
                        for(map in matches[match].maps) {
                            if(matches[match].maps[map] == 'default') matches[match].maps[map] = 'undefined';
                            else matches[match].maps[map] = mapsTranslator[matches[match].maps[map]]
                            console.log(matches[match].maps[map]);
                        }
                    }
                    list.push(matches[match]);
                }
            }
            res.send(list);
        })
    })
    app.post('/getMatch/:matchId', function(req,res) {
        HLTV.getMatch({id: req.params.matchId}).then(match => {
            console.log(match);
            res.send(match)
        })
    })

}
