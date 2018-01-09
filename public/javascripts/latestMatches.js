var latestMatches = new Vue({
    el: '#latestMatches',
    data: {
        matches: [],
    },
    methods: {
        getLatestMatches() {
            axios.post('/getLatestMatches').then(response => {
                this.matches = response.data;
            })
        },
    }
})
latestMatches.getLatestMatches();
