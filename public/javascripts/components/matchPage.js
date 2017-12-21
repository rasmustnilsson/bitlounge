var matchPage = new Vue({
    el: '#match_wrapper',
    data: {
        id: matchId,
        team1: '',
        team2: '',
        date: 0,
        format: '',
        additionalInfo: '',
        live: false,
        players: {},
        streams: [],
    },
    methods: {
        getMatch: function() {
            axios.post('/getMatch/'+this.id).then((response) => {
                console.log(response.data);
                this.team1 = response.data.team1.name;
                this.team2 = response.data.team2.name;
                this.date = response.data.date;
                this.format = response.data.format;
                this.additionalInfo = response.data.additionalInfo;
                this.live = response.data.live;
                this.players = response.data.players;
                this.streams = response.data.streams;
            })
        }
    }
})
matchPage.getMatch();
