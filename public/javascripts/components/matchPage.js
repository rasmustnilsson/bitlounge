var matchPage = new Vue({
    el: '#match_wrapper',
    data: {
        id: matchId,
        team1: {
            name: match.team1.name,
            id: match.team1.id,
            payout: match.betData.team1.payout,
        },
        team2: {
            name: match.team2.name,
            id: match.team2.id,
            payout: match.betData.team2.payout,
        },
        date: match.date,
        format: match.format,
        headToHead: match.headToHead,
        bets: match.betData.bets,
        vetoes: match.vetoes,
        isLoggedIn: isLoggedIn,
        highlightedPlayers: match.highlightedPlayers,
        maps: match.maps,
        hasScoreBot: match.hasScorebot,
        additionalInfo: match.additionalInfo,
        live: match.live,
        players: match.players,
        streams: match.streams,
        betAmount: '',
        pickedTeam: '',
    },
    methods: {
        makeBet: function () {
            if(this.betAmount == '' || this.pickedTeam == '') return console.log('need to input number and a picked team');
            socket.emit('makeBet', this.id, this.pickedTeam, this.betAmount);
            this.betAmount = '';
        },
        selectTeam: function(team) {
            this.pickedTeam = team;
        },
        getDate: function() {
            if(this.live) return moment(this.date).fromNow();
            return moment(this.date).format('MMMM Do, h:mm:ss a');
        },
        getHeadToHead: function() { // sorts the head to head games
            if(this.headToHead.length == 0) return [];
            let eventCounter = 0;
            let events = [{
                event: this.headToHead[0].event,
                date: moment(this.headToHead[0].date).fromNow(),
                team1: this.headToHead[0].winner.id == this.team1.id ? 1:0,
                team2: this.headToHead[0].winner.id == this.team2.id ? 1:0,
            }];
            for(let i = 1; i < this.headToHead.length; i++) {
                let game = this.headToHead[i];
                if(events[eventCounter].event.id == game.event.id) {
                    if(game.winner.id == this.team1.id) events[eventCounter].team1 += 1;
                    else if(game.winner.id == this.team2.id) events[eventCounter].team2 += 1;
                    continue;
                }
                eventCounter++;
                events.push({
                    event: game.event,
                    date: moment(game.date).fromNow(),
                    team1: game.winner.id == this.team1.id ? 1:0,
                    team2: game.winner.id == this.team2.id ? 1:0,
                });
            }
            return events;
        },
    }
})
