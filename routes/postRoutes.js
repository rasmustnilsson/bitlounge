const db = require('../config/database/queries');
const { HLTV } = require('hltv')
const Client = require('coinbase').Client;

module.exports = function(app,passport,isLoggedIn) {
    app.post('/getMatches', function(req,res,next) {
        HLTV.getMatches().then((matches) => {
            res.send(matches);
        })
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
    app.post('/makeBet',function(req,res) {
        console.log(req.user);
        res.send('works');
    })
    app.get('/getAccounts',isLoggedIn,function(req,res) {
        const user = req.session.passport.user;
        var client = new Client({'accessToken': user.accessToken, 'refreshToken': user.refreshToken, "scope": ["wallet:accounts:read"]});
        client.getAccounts({}, function(err, accounts) {
            if(err) return console.log(err);
            accounts.forEach(function(acct) {
                console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            });
            res.send(accounts);
        });
    })
}
