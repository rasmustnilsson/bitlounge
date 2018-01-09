var betsPage = new Vue({
    el: '#betsPage',
    data: {
        bets: bets,
        filter: -1, // -1 = all, 'active' = only active, 'finished' = only finished
    },
    methods: {
        getBets() {
            let betsToShow = [];
            for(bet of this.bets) {
                if(this.filter == -1 || // if filter is all
                    (this.filter == 'active' && bet.active) || // if filter is 'active'
                    (this.filter == 'finished' && !bet.active)) betsToShow.push(bet); // if filter is 'finished'
            }
            return betsToShow;
        },
        getDate(date) {
            return moment(date).format('MMMM Do, h:mm:ss a');
        },
    }
})
