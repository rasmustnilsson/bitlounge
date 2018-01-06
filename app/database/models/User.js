const table = require('../../../config/database/tables');
const dynamoose = require('../../../config/database/config');

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
    bets: { type: Array, default: [] },
});

userSchema.methods.newBet = function(id,bet) {
    this.statistics.totalBets += 1;
    this.statistics.activeBets += 1;
    this.bets.push({
        id:id,
        amount: bet.amount,
        date: Date.now(),
        team: bet.team,
        active: true,
    });
}
userSchema.methods.matchFinished = function(match) {
    for(let index in this.bets) {
        if(match.id == this.bets[index].id) {
            this.bets[index].active = false;
            this.statistics.activeBets -= 1;
            if(match.winnerTeam.id == this.bets[index].team.id) {
                this.statistics.wins += 1;
                this.bets[index].won = true;
            } else {
                this.statistics.losses += 1;
                this.bets[index].won = false;
            }
        }
    }
}

module.exports = dynamoose.model(table.users, userSchema, {
    create: true, // Create table in DB, if it does not exist,
    update: false, // Update remote indexes if they do not match local index structure
    waitForActive: true, // Wait for table to be created before trying to use it
});
