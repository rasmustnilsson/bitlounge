module.exports = function() {
    if(process.env.NODE_ENV != 'production') {
        const session = require('express-session');
        const redis = require('redis');
        const client = redis.createClient();
        const redisStore = require('connect-redis')(session);
        return new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260});
    } else {
        return null;
    }
}
