var socket = io(':3000');
socket.emit('matchId',matchId);
socket.on('newBet',function(bet) {
    matchPage.bets.push(bet);
})
