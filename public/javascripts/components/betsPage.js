var betsPage = new Vue({
    el: '#betsPage',
    data: {
        bets: bets,
        filter: -1, // -1 = all, 'active' = only active, 'finished' = only finished
    },
    methods: {
        show: function(betStatus) {
            if(this.filter == -1) return true;
            if(this.filter == 'active' && betStatus) return true;
            if(this.filter == 'finished' && !betStatus) return true;
            return false;
        }
    }
})
