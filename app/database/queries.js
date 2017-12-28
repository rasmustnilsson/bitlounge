const { HLTV } = require('hltv');
const Bet = require('./models/Bet');
const async = require('async');

const J = {
    match: {
        get: (id) => {
            return new Promise((resolve,reject) => {
                let match,betData;
                async.parallel([
                    (callback) => {
                        HLTV.getMatch({id:id}).then(response => {
                            match = response;
                            callback();
                        })
                    }, (callback) => {
                        Bet.get(id).then((response) => {
                            betData = response;
                            if(!response) {
                                betData = new Bet({id:id});
                                betData.save();
                            }
                            callback();
                        })
                    }
                ], (err) => {
                    if(err) throw err;
                    match.betData = betData;
                    resolve(match);
                })
            })
        },
        makeBet: function (user,id,amount) {
            return new Promise((resolve,reject) => {
                Bet.get(id).then((bet) => {
                    bet.bets.push({ name: user, amount: amount, date: Date.now });
                    bet.save(function(err,bet) {
                        resolve(err,bet);
                    })
                })
            })
        },
    },
}

module.exports = J;
