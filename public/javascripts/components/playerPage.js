var playerPage = new Vue({
    el: '#player_wrapper',
    data: {
        name: '',
    },
    methods: {
        getPlayer: function() {
            axios.post('/getPlayer/'+playerId).then((response) => {
                this.name = response.data;
            })
        },
    }
})
playerPage.getPlayer();
