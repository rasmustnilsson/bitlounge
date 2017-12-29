var matchPage = new Vue({
    el: '#match_wrapper',
    data: {
        id: matchId,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        format: match.format,
        headToHead: match.headToHead,
        bets: match.bets,
        vetoes: match.vetoes,
        isLoggedIn: isLoggedIn,
        highlightedPlayers: match.highlightedPlayers,
        maps: match.maps,
        hasScoreBot: match.hasScoreBot,
        additionalInfo: match.additionalInfo,
        live: match.live,
        players: match.players,
        streams: match.streams,
        betAmount: '',
    },
    methods: {
        makeBet: function () {
            if(this.betAmount == '') return console.log('need to input number');
            socket.emit('makeBet', this.id, this.betAmount);
            this.betAmount = '';
        },
        getDate: function () {
            if(this.live) {
                return moment(this.date).fromNow();
            }
            return moment(this.date).format('MMMM Do, h:mm:ss a');
        },
    }
})
