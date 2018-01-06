const table = require('../../../config/database/tables');
const dynamoose = require('../../../config/database/config');

const matchSchema =  new dynamoose.Schema({
    id: String,
    bets: { type: Array, default: [] },
    active: { type: Boolean, default: true },
    winnerTeam: Object,
    team1: Object,
    team2: Object,
    totalPot: { type: Number, default: 0 },
});

matchSchema.methods.matchFinished = function(winnerTeam) {
    this.active = false;
    this.winnerTeam = winnerTeam;
}

matchSchema.methods.newBet = function(user,team,amount) {
    this.bets.push({
        name: { id: user.id, displayName: user.displayName },
        amount: amount,
        team: team,
        date: Date.now(),
    });
    this.totalPot += amount;
    if(this.team1.id == team.id) {
        this.team1.pot += amount;
    }
    else if(this.team2.id == team.id) {
        this.team2.pot += amount;
    }
}

matchSchema.statics.getBet = function(id){
    return new Promise((resolve,reject) => {
        this.get(id).then(match => {
            if(!match) return resolve({
                bets: [],
                team1: { payout: 1 },
                team2: { payout: 1 },
            })
            if(match.team1.pot == 0 || match.team2.pot == 0) {
                match.team1.payout = 1;
                match.team2.payout = 1;
            } else {
                match.team1.payout = match.team2.pot / match.team1.pot + 1;
                match.team2.payout = match.team1.pot / match.team2.pot + 1;
            }
            resolve({
                bets: match.bets,
                team1: { payout: match.team1.payout },
                team2: { payout: match.team2.payout },
            });
        })
    })
}

module.exports = dynamoose.model(table.matches, matchSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: false, // Update remote indexes if they do not bet local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
});
