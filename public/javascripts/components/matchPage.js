var matchPage = new Vue({
    el: '#match_wrapper',
    data: {
        id: matchId,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        format: match.format,
        headToHead: match.headToHead,
        vetoes: match.vetoes,
        highlightedPlayers: match.highlightedPlayers,
        maps: match.maps,
        hasScoreBot: match.hasScoreBot,
        additionalInfo: match.additionalInfo,
        live: match.live,
        players: match.players,
        streams: match.streams,
    },
    methods: {

    }
})
