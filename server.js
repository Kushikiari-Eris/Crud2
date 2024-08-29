
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};

const express = require('express');
const connectToDb = require('./config/connectToDb.js');
const itemController = require('./controllers/itemController.js');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());


connectToDb();


//Routing

//Create
app.post('/item', itemController.createItem);
//Show all
app.get('/item', itemController.showAllItem);
//Show only one Specific Item using ID
app.get('/item/:id', itemController.showOnlyOneItem);
//Update an Item
app.put('/item/:id', itemController.updateAnItem);
//Delete an Item
app.delete('/item/:id', itemController.deleteItem);




// mongodb password:eDUXTMDj40kzzmj2
app.listen(process.env.PORT);