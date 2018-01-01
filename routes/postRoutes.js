const db = require('../app/database/queries');
const { HLTV } = require('hltv')
const Client = require('coinbase').Client;
const matches = require('../app/matchStorage.js');

module.exports = function(app) {
    app.post('/getMatches', function(req,res,next) {
        res.send(matches.getMatches());
    })
    app.post('/getMatch/:matchId', function(req,res) {
        HLTV.getMatch({id: req.params.matchId}).then(match => {
            res.send(match);
        })
    })
    app.post('/getPlayer/:playerId', function(req,res) {
        HLTV.getPlayer({id: req.params.playerId}).then(player => {
            res.send(player);
        })
    })
}
