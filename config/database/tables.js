const J = {
    matches: 'matchesDev',
    users: 'usersDev',
}

if(process.env.NODE_ENV == 'production') {
    J.matches = 'matches';
    J.users = 'users';
}

module.exports = {
    matches: J.matches,
    users: J.users,
}
