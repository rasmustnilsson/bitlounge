var socket = io(port);
socket.emit('matchId',matchId);
socket.on('newBet',function(bet) {
    matchPage.bets.push(bet);
})
