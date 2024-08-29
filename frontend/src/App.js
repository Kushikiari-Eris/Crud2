import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [ item, setItem ] = useState(null);
  const [ createItemForm, setCreateItemForm ]= useState({
    itemName: "",
    discription: "",
  });
  const [ updateForm, setUpdateForm ] = useState({
    _id: null,
    itemName: "",
    discription: "",
  });

  useEffect( () => {
    fetchItem();
  }, []);


  // Functions
  const fetchItem = async () => {
    const res = await axios.get("http://localhost:3000/item");
    setItem(res.data.item);
  };

  const createItem = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/item", createItemForm);
    setItem([
      ...item,
      res.data.item
    ]);

    setCreateItemForm({ itemName: "", discription: ""});
  };

  const updateCreateItemForm = (e) => {
    const { name, value } = e.target;

    setCreateItemForm({
      ...createItemForm,
      [name]: value,
    });
  };

  const deleteItem = async (_id) => {
    
    const res = await axios.delete(`http://localhost:3000/item/${_id}`);
    const newItem = [...item].filter((itemSchema) =>{
      return itemSchema._id !== _id;
    });

    setItem(newItem);
  }
  

  const handleUpdateFieldChange = (e) => {
    const {name, value} = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (itemSchema) =>{
    setUpdateForm({ itemName: itemSchema.itemName, discription: itemSchema.discription, _id: itemSchema._id });
  };

  const updateItem = async (e) =>{
    e.preventDefault();
    const {itemName, discription} = updateForm;

    const res = await axios.put(`http://localhost:3000/item/${updateForm._id}`, {itemName, discription});

    const newItem = [...item];
    const itemIndex = item.findIndex((itemSchema) =>{
      return itemSchema._id === updateForm._id;
    });
    newItem[itemIndex] = res.data.item;

    setItem(newItem);

    setUpdateForm({
      _id: null,
      itemName: "",
      discription: "",
    });
  };



  return (
    <div className='App'>

    <div >
      <h2>My Items:</h2>
      {item && item.map((itemSchema) =>{
        return(
          <div key={itemSchema._id}>
            <h3>Item Name: {itemSchema.itemName}</h3>
            <h3>Discription: {itemSchema.discription}</h3>
            <button onClick={() => deleteItem(itemSchema._id)}>Delete Item</button>
            <button onClick={() => toggleUpdate(itemSchema)}>Edit Item</button>
          </div>
        );
      })}
    </div>

    {updateForm._id && (<div>
      <h2>Edit Item</h2>
      <form onSubmit={updateItem}>
        <input onChange={handleUpdateFieldChange} value={updateForm.itemName} name='itemName'/>
        <input onChange={handleUpdateFieldChange} value={updateForm.discription} name='discription'/>
        <button type='submit'>Update Item</button>
      </form>
    </div>
    )}

    
    {!updateForm._id && (<div>
      <h2>Create Item</h2>
      <form onSubmit={createItem}>
        <input onChange={updateCreateItemForm} value={createItemForm.itemName} name='itemName'/>
        <input onChange={updateCreateItemForm} value={createItemForm.discription} name='discription'/>
        <button type='submit'>Create Item</button>
      </form>
    </div>
    )}


    </div>
  );
}

export default App;
