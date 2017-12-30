const { HLTV } = require('hltv');

let matches = []; // stores all the games, is passed to the browser
let active = []; // stores only the active games

/**
 * if a match in activeArray is not in HLTV.getMatches response => match is over
 */

function loadMatches() {
    HLTV.getMatches().then(response => {
        for(let activeMatch of active) { // loops all the previously active matches
            activeMatchesIn: for(let i = 0; i < response.length;i++) { // loops and checks if any game is over
                let match = response[i];
                // game is not over
                if(activeMatch.id == match.id) break activeMatchesIn;
                // game is over
                if(i == response.length - 1) {
                    console.log('game: ' + activeMatch.id + ' is over!');
                }
            }
        }
        // reloads all the matches
        matches = [];
        active = [];
        for(match in response) {
            // if game is active
            if(response[match].live) active.push(response[match]);
            matches.push(response[match]);
        }
    });
}

loadMatches();
setInterval(function(){
    loadMatches();
}, 1000 * 30);

module.exports = {
    getMatches: function () {
        return matches;
    },
    matchIsActive: function (id) {
        for(let match of active) {
            if(match.id == id) return true;
        }
        return false;
    },
}
