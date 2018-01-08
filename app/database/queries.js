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
                        Match.getBet(id).then((response) => {
                            if(!response) betData = [];
                            else {
                                betData = response;
                            };
                            callback();
                        })
                    }
                ], (err) => { // when async is done
                    if(err) throw err;
                    match.betData = betData;
                    resolve(match);
                })
            })
        },
        makeBet: function (user,id,team,amount) {
            return new Promise((resolve,reject) => {
                // rejects if match is still active
                if(matchStorage.isActive(id)) return reject('match is active');
                team = matchStorage.getTeam(id,team);
                User.get(user.id).then(user => {
                    // rejects if not enough money
                    if(user.wallet <= amount) return reject('not enough money!');
                    // pushes new bet
                    user.newBet(id, {
                        userId: user.id,
                        amount: amount,
                        team: team,
                    });
                    user.save();
                    Match.get(id).then((match) => {
                        // if no match exists in db => creates new
                        if(!match) {
                            const team1 = matchStorage.getTeam(id,'team1');
                            const team2 = matchStorage.getTeam(id,'team2');
                            match = new Match({
                                id: id, bets: [], totalPot: 0,
                                team1: { id: team1.id, name: team1.name, pot: 0 },
                                team2: { id: team2.id, name: team2.name, pot: 0 },
                            })
                        }
                        match.newBet(user,team,amount);
                        match.save(function(err,match) {
                            resolve(team);
                        })
                    })
                })
            })
        },
    },
    user: {
        getProfile: function(id) {
            return new Promise((resolve,reject) => {
                User.scan({id: {eq: id}})
                .attributes(['displayName', 'name', 'statistics', 'wallet']).exec((err,user) => {
                    resolve(user[0]);
                })
            })
        },
        changeDisplayName: function(id,newDisplayName) {
            return new Promise((resolve,reject) => {
                if(newDisplayName.length == 0) return resolve();
                User.get(id).then(user => {
                    user.displayName = newDisplayName;
                    user.save();
                    resolve();
                })
            })
        },
        getAllBets: function(id) {
            return new Promise((resolve,reject) => {
                User.get(id).then((user) => {
                    resolve(user.bets);
                })
            })
        },
    },
}

module.exports = J;
