const dynamoose = require('../../../config/database/config');
const table = require('../../../config/database/tables');

const Match = require('./Match');

const userSchema = new dynamoose.Schema({
    id: String,
    name: String,
    displayName: String,
    isAdmin: { type: Boolean, default: false },
    reg_date: { type: Date, default: Date.now },
    statistics: { type: Object, default: {
        totalBets: 0,
        activeBets: 0,
        wins: 0,
        losses: 0,
    }},
    wallet: { type: Number, default: 0 },
    bets: { type: Array, default: [] },
});

userSchema.statics.gotMoney = function(id,amount) {
    return new Promise((resolve,reject) => {
        this.get(id).then(user => {
            if(user.wallet >= amount) return resolve();
            reject();
        })
    })
}

userSchema.methods.newBet = function(id,bet) {
    this.statistics.totalBets += 1;
    this.statistics.activeBets += 1;
    this.wallet -= bet.amount;
    this.bets.push({
        id:id,
        amount: bet.amount,
        date: Date.now(),
        team: bet.team,
        active: true,
    });
}
userSchema.methods.matchFinished = function(match) {
    return new Promise((resolve,reject) => {
        for(let index in this.bets) {
            const bet = this.bets[index];
            if(match.id == bet.id) {
                bet.active = false;
                this.statistics.activeBets -= 1;
                if(match.winnerTeam.id == bet.team.id) {
                    this.statistics.wins += 1;
                    bet.won = true;
                    Match.getWinnerPayout(match.id,bet.amount).then((amount) => {
                        this.wallet += amount;
                        bet.payout = amount;
                        resolve(this);
                    })
                } else {
                    this.statistics.losses += 1;
                    bet.won = false;
                    bet.payout = 0;
                    resolve(this);
                }
            }
        }
    })
}

module.exports = dynamoose.model(table.users, userSchema, {
    create: true, // Create table in DB, if it does not exist,
    update: false, // Update remote indexes if they do not match local index structure
    waitForActive: true, // Wait for table to be created before trying to use it
});
