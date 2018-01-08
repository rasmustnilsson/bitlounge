var socket = io(port);
socket.emit('matchId',matchId);
socket.on('newBet',function(bet) {
    matchPage.bets.push(bet);
})
socket.on('alert', function(msg) {
    console.log(msg);
})
