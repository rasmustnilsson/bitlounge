const dynamoose = require('../../../config/database/config');

const matchSchema =  new dynamoose.Schema({
    id: String,
    bets: { type: Array, default: []},
    active: { type: Boolean, default: true },
    winnerTeam: Object,
});

matchSchema.methods.matchFinished = function(winnerTeam) {
    this.active = false;
    this.winnerTeam = winnerTeam;
}

module.exports = dynamoose.model('matches', matchSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: false, // Update remote indexes if they do not bet local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
});
