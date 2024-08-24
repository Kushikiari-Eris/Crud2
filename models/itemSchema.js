const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: String,
    discription: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;