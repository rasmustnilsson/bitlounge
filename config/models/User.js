var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  accessKeyId: 'AKIAJFLA6GH7T72ODZYA',
  secretAccessKey: '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',
  region: 'eu-west-2'
});

const userSchema =  {
  id: String,
  isAdmin: { type: Boolean, default: false },
  reg_date: { type: Date, default: Date.now },
  statistics: { type: Object, default: {
      totalBets: 0,
      activeBets: 0,
      wins: 0,
      losses: 0,
  }},
};

module.exports = dynamoose.model('users', userSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: false, // Update remote indexes if they do not match local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
});
