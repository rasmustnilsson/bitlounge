const dynamoose = require('../../../config/database/config');

const betSchema =  {
    id: String,
    bets: { type: Array, default: [{ name:'Rasmus', amount: 10, date: Date.now }]},
    active: { type: Boolean, default: true },
};

module.exports = dynamoose.model('bets', betSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: false, // Update remote indexes if they do not bet local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
});
