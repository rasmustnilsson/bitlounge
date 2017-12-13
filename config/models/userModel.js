const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    reg_date: { type: Date, default: Date.now },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
