var matches = new Vue({
    el: '#matches',
    data: {
        matchesList: [],
    }
})
var a;
axios.post('/getMatches').then((response) => {
    a = response.data;
    console.log(a);
    matches.matchesList = response.data;
})
