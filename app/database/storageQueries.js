const Match = require('./models/Match');
const User = require('./models/User');

const J = {
    matchFinished: function (match) {
        const winnerTeam = match.winnerTeam;
        Match.get(match.id).then((match) => {
            if(!match) return console.log('no bets exist!');
            match.matchFinished(winnerTeam);
            match.save();
            for(let bet of match.bets) {
                User.get(bet.name.id).then(user => {
                    user.matchFinished(match);
                    user.save(function(err,user) {
                        console.log(err,user);
                    });
                })
            }

        })
    },
}

module.exports = J;
