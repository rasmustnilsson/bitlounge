const db = require('../database/queries');

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.on('matchId', function(id) {
            socket.join(id);
        })
        if(socket.handshake.session) { // if user is signed in
            socket.on('makeBet', function(id, amount) {
                const user = socket.handshake.session.user;
                db.match.makeBet(user,id,parseInt(amount)).then(() => {
                    socket.nsp.to(id).emit('newBet', {
                        name: user.displayName,
                        amount: amount,
                    });
                },() => {
                    console.log(displayName + ' tried to bet on active game');
                })
            })
        }

    });
}
