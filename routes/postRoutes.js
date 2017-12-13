const db = require('../config/database/queries');
const { HLTV } = require('hltv')

module.exports = function(app,passport,isLoggedIn) {
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/err', // redirect back to the signup page if there is an error
    }));
    app.post('/getMatches', function(req,res,next) {
        HLTV.getMatches().then((matches) => {
            var list = [];
            for(match in matches) {
                if(matches[match].team1 && matches[match].team2) {
                    list.push(matches[match]);
                }
            }
            res.send(list);
        })
    })

}
