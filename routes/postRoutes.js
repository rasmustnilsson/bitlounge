const db = require('../config/database/queries');
const mapsTranslator = require('../config/mapsTranslator');
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
            res.send(match)
        })
    })
    app.post('/getAccounts', function(req,res) {
        const user = req.session.passport.user;
        var client = new Client({'apikey': user.accessToken, 'refreshToken': user.refreshToken});
        client.getAccounts({}, function(err, accounts) {
            accounts.forEach(function(acct) {
                console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            });
            res.send(accounts);
        });
    })
    app.post('/auth/coinbase',passport.authenticate('coinbase-login'));
    app.post('/signup/coinbase',passport.authenticate('coinbase-signup'));

}
