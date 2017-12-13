const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    price: String,
    isUnlisted: { type: Boolean, default: false },
    tags: { type: Array, default: [] },
    seller: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema,'inventory');
