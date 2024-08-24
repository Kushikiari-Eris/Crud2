const Item = require('../models/itemSchema.js');
const {ObjectId} = require('mongodb');

//Create
const createItem =  async (req, res) =>{
    const itemName = req.body.itemName;
    const discription = req.body.discription;

    const item = await Item.create({
        itemName: itemName,
        discription: discription,
    });

    res.json({ item: item });
};

//Show All Items
const showAllItem =  async (req, res) =>{
    const item = await Item.find();
    res.json({ item: item });
};

//Show only one specific item using Id
const showOnlyOneItem =  async (req, res) =>{
    const itemId = req.params.id;

    const item = await Item.findById(itemId);

    res.json({ item: item });
};

const updateAnItem =  async (req, res) =>{
    const itemId = req.params.id;

    const itemName = req.body.itemName;
    const discription = req.body.discription;

    await Item.findByIdAndUpdate(itemId, {
        itemName: itemName,
        discription: discription,
    });

    const item = await Item.findById(itemId);

    res.json({ item: item });
};

//Delete an Item
const deleteItem = async (req, res) =>{
    const itemId = new ObjectId(req.params.id);

    await Item.deleteOne({ _id: itemId });

    res.json({Success: "Item Deleted"});
};

module.exports = {
    createItem,
    showAllItem,
    showOnlyOneItem,
    updateAnItem,
    deleteItem,
};