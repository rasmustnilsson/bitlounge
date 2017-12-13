const Item = require('../models/itemModel');
const mongoose = require('mongoose');
const J = {
    createItem: function(userItem,seller) {
        return new Promise((resolve,reject) => {
            let newItem = new Item();
            newItem.name = userItem.name;
            newItem.seller = seller;
            newItem.price = userItem.price;
            newItem.tags = userItem.tags;
            newItem.isUnlisted = !!userItem.isUnlisted;

            newItem.save(function(err) {
                if(err) return reject();
                return resolve();
            })
        })
    },
    getVisibleItems: function(body,params) {
        let obj = {};
        if(params.profile) obj = { seller: params.profile };
        return new Promise((resolve,reject) => {
            Item.find(obj, "-_id name price seller tags", function(err,result) {
                if(!result.length) reject();
                resolve(result);
            }).sort('-date').limit(2).skip(2 * body.loadCounter);
        })
    },
}

module.exports = J;
