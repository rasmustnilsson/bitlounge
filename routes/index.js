const axios = require('axios');
const Client = require('coinbase').Client;
const dynamoose = require('dynamoose');
const User = require('../app/database/models/User');

const coinbaseConfig = require('../config/coinbase/config.js');
const COINBASE_CLIENT_ID = coinbaseConfig.COINBASE_CLIENT_ID;
const COINBASE_CLIENT_SECRET = coinbaseConfig.COINBASE_CLIENT_SECRET;
const COINBASE_AUTHENTICATION_CALLBACK = coinbaseConfig.COINBASE_AUTHENTICATION_CALLBACK;

module.exports = function(app) {

    function authenticate(req,res) {
        res.redirect('https://www.coinbase.com/oauth/authorize?response_type=code&client_id=' + COINBASE_CLIENT_ID + '&redirect_uri=' + COINBASE_AUTHENTICATION_CALLBACK + '&scope=wallet:user:read,wallet:accounts:read');
    }

    function login(req,res) {
        axios.post('https://api.coinbase.com/oauth/token', {
            grant_type: 'authorization_code',
            code: req.query.code,
            client_id: COINBASE_CLIENT_ID,
            client_secret: COINBASE_CLIENT_SECRET,
            redirect_uri: COINBASE_AUTHENTICATION_CALLBACK,
        }).then(response => {
            const clientTokens = {'accessToken': response.data.access_token, 'refreshToken': response.data.refresh_token};
            const client = new Client(clientTokens);
            client.getCurrentUser((err, user) => {
                User.get(user.id).then((profile) => {
                    function authenicated(profile) {
                        req.session.user = profile;
                        req.session.user.client = clientTokens;
                        req.session.save(() => {
                            res.redirect('/');
                        })
                    }
                    if(profile) return authenicated(profile);
                    profile = new User({
                        id: user.id,
                        name: user.name,
                        displayName: user.name,
                    });
                    profile.save(() => {
                        authenicated(profile);
                    })
                })
            });
        })
    }
    function isLoggedIn(req, res, next) {
        if (req.session.user) return next();
        return res.redirect('/auth/coinbase');
    }
    require('./getRoutes')(app,login,isLoggedIn,authenticate);
    require('./postRoutes')(app,login,isLoggedIn);

};
