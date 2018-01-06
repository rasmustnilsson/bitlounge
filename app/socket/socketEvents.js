const db = require('../database/queries');

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.on('matchId', function(id) {
            socket.join(id);
        })
        if(socket.handshake.session.user) { // if user is signed in
            const user = socket.handshake.session.user;
            socket.on('makeBet', function(id, team, amount) {
                if(!id || (team != 'team1' && team != 'team2') || !amount) return;
                db.match.makeBet(user,id,team,parseInt(amount)).then((team) => {
                    socket.nsp.to(id).emit('newBet', {
                        name: {id: user.id, displayName: user.displayName},
                        amount: amount,
                        team: team,
                    });
                },(err) => {
                    throw err;
                })
            })
        }

    });
}
