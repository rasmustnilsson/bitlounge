const { HLTV } = require('hltv');
const Match = require('./models/Match');
const User = require('./models/User');
const async = require('async');
const matchStorage = require('../matchStorage');

const J = {
    match: {
        get: (id) => {
            return new Promise((resolve,reject) => {
                let match,betData;
                async.parallel([ // runs getMatch and get Bet at the same time
                    (callback) => {
                        HLTV.getMatch({id:id}).then(response => {
                            match = response;
                            callback();
                        })
                    }, (callback) => {
                        Match.get(id).then((response) => {
                            if(!response) betData = [];
                            else betData = response.bets;
                            callback();
                        })
                    }
                ], (err) => { // when async is done
                    if(err) throw err;
                    match.bets = betData;
                    resolve(match);
                })
            })
        },
        makeBet: function (user,id,team,amount) {
            return new Promise((resolve,reject) => {
                if(matchStorage.isActive(id)) return reject('match is active');
                const newBet = {
                    name: { id: user.id, displayName: user.displayName },
                    amount: amount,
                    team: matchStorage.getTeam(id,team),
                    date: Date.now,
                };
                Match.get(id).then((match) => {
                    if(!match) {
                        const match = new Match({
                            id:id,
                            bets: [newBet],
                        })
                        match.save(function(err,match) {
                            resolve(err,match);
                        })
                    } else {
                        match.bets.push(newBet);
                        match.save(function(err,match) {
                            resolve(err,match);
                        })
                    }
                    J.user.newBet(id,newBet);
                })
            })
        },
    },
    user: {
        newBet: function(id,bet) {
            User.get(bet.name.id).then((user) => {
                user.newBet(id,bet);
                user.save();
            });
        },
        getAllBets: function (id) {
            return new Promise((resolve,reject) => {
                User.get(id).then((user) => {
                    resolve(user.bets);
                })
            })
        },
    },
}

module.exports = J;
