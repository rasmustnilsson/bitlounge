const db = require('../database/queries');

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.on('matchId', function(id) {
            socket.join(id);
        })
        if(socket.handshake.session) { // if user is signed in
            socket.on('makeBet', function(id, amount) {
                db.match.makeBet(socket.handshake.session.user.displayName,id,parseInt(amount))
                .then(() => {
                    socket.nsp.to(id).emit('newBet', {
                        name: socket.handshake.session.user.displayName,
                        amount: amount,
                    })
                })
            })
        }

    });
}
