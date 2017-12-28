const dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
  accessKeyId: '--accesskey-goes-here--',
  secretAccessKey: '--secretAccessKey-goes-here--',
  region: 'eu-west-2' // default
});
module.exports = dynamoose;
