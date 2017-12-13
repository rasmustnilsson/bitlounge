const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  reg_date: { type: Date, default: Date.now },
  statistics: {
    totalBets: { type: Number, default: 0 },
    activeBets: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
  },

});
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
