const { HLTV } = require('hltv')
let matches = [];

function loadMatches() {
    HLTV.getMatches().then(response => {
        matches = response;
    })
}
loadMatches();

setInterval(function(){ loadMatches(); }, 1000 * 30);

module.exports = {
    getMatches: function () {
        return matches;
    },
}
