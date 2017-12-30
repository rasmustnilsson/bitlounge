const dynamoose = require('../../../config/database/config');

const userSchema =  {
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
};

module.exports = dynamoose.model('users', userSchema, {
    create: true, // Create table in DB, if it does not exist,
    update: false, // Update remote indexes if they do not match local index structure
    waitForActive: true, // Wait for table to be created before trying to use it
});
