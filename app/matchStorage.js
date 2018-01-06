const { HLTV } = require('hltv');
const Match = require('./database/models/Match');
const storageQueries = require('./database/storageQueries');

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
                    HLTV.getMatch({id:activeMatch.id}).then((match) => {
                        // if the game cant be found
                        if(!match || !match.winnerTeam) return;
                        match.id = activeMatch.id; // active match id
                        console.log('game: ' + match.id + ' is over!');
                        storageQueries.matchFinished(match);
                    })
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
setInterval(function(){ // updates matches every 10 seconds
    loadMatches();
}, 1000 * 10);

const J = {
    getMatches: function() {
        return matches;
    },
    getTeam: function(id,team) {
        for(let match of matches) {
            if(match.id == id) {
                return match[team];
            }
        }
    },
    isActive: function(id) {
        for(let match of active) if(match.id == id) return true;
        return false;
    },
}
module.exports = J;
