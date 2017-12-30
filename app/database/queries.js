const { HLTV } = require('hltv');
const Match = require('./models/Match');
const User = require('./models/User');
const async = require('async');
const matchStorage = require('../matches');

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
                ], (err) => {
                    if(err) throw err;
                    match.bets = betData;
                    resolve(match);
                })
            })
        },
        makeBet: function (user,id,amount) {
            return new Promise((resolve,reject) => {
                if(matchStorage.matchIsActive(id)) return reject();
                const date = Date.now;
                Match.get(id).then((match) => {
                    if(!match) {
                        const match = new Match({
                            id:id,
                            bets: [{name: user.displayName, amount, date: date}],
                        })
                        match.save(function(err,match) {
                            resolve(err,match);
                        })
                    } else {
                        match.bets.push({ name: user.displayName, amount: amount, date: date });
                        match.save(function(err,match) {
                            resolve(err,match);
                        })
                    }
                    J.user.newBet(id,user.id,amount,date);
                })
            })
        },
    },
    user: {
        newBet: function(id,user,amount,date) {
            console.log(date);
            return new Promise((resolve,reject) => {
                User.get(user).then((user) => {
                    user.statistics.totalBets += 1;
                    user.statistics.activeBets += 1;
                    user.bets.push({
                        id:id,
                        amount: amount,
                        date: date,
                        active: true,
                    });
                    user.save((err,user) => {
                        resolve(user);
                    });
                });
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
