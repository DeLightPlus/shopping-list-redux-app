import { addShoppingItem } from "../redux/shoppingListReducer";

import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { shoppingCategories } from "../constants";

function AddShoppingItem({ setShowAddForm }) {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  if (user) {
    // console.log('Logged-in user:', user);
    // You can access the user's data here, e.g. user.name, user.email, etc.
  }

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(""); 
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");    
  const [extraNotes, setExtraNotes] = useState("");  
  const [listType, setListType] = useState("");
  const [listTypeInput, setListTypeInput] = useState("");  

  const handleAddItem = () => {
    dispatch(addShoppingItem({ 
        id: `${Date.now()}`, 
        uid: user.id, 
        type: `${listType}`,
        shoppingItem: `${item}`, 
        price: `${price}`, 
        quantity: `${quantity}`, 
        category: `${category}`,
        extraNotes: `${extraNotes}` 
      }));
    
    setListType("")
    setItem("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setExtraNotes("");
  };

  return (
    <div className="add-shopping-item-container">
      <button className="back_btn" onClick={() => setShowAddForm(false)} > ✖ </button>
      <div className="input-container">
        <div className="add-shopping-item-group">      
          <label className="add-shopping-item-label">
            ItemName 
          </label>
          <input className="add-shopping-item-input"
            type="text" placeholder="(e.g. Apple)" value={item}      
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="hgroup">
          <div className="add-shopping-item-group">
            <label className="add-shopping-item-label">
              Estimated Price(R) <span></span>
            </label>
            <input className="add-shopping-item-input"
              type="number" placeholder="(e.g. 10)"  value={price}      
              onChange={(e) => {
                const inputValue = e.target.value;
                setPrice(inputValue < 0 ? Math.abs(inputValue) : (inputValue));
              }
              }
            />
          </div>

          <div className="add-shopping-item-group">
            <label className="add-shopping-item-label">
              Quantity <span>(e.g. x3)</span>
            </label>
            <input className="add-shopping-item-input"
              type="number" placeholder="Quantity"  value={quantity}      
              onChange={(e) => setQuantity(Math.abs(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="calculate-item">
        <span>
          {item && 
            <strong>{item} <sub>x{quantity}</sub> = R{price * quantity}</strong>}
        </span>
      </div>

      <div className="other-inputs-group">
        
        <select className="category-select" 
          onChange={(e) => setCategory(e.target.value)}>
          {shoppingCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> 

       
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
          {/* <label htmlFor=""><small>List Name/Type</small></label> */}
          {
            !listTypeInput &&
            <select value={listType} onChange={(e)=> setListType(e.target.value)}>
              {/* <option value="">List name/type</option> */}
              <option value="groceries">Groceries</option>
              <option value="equipment">Household Items</option>
            </select>
          }

          <input placeholder="List Type" style={{width:'100%',}} 
            value={listTypeInput} onChange={(e)=>setListTypeInput(e.target.value)}
          />
        </div>         
                        
      </div> 

      <textarea value={extraNotes} 
        placeholder="Extra Notes:"
        onChange={(e) => setExtraNotes(e.target.value)} 
      /> 
      <button className="add-shopping-item-button"
        onClick={handleAddItem}>
          <div className="icn">➕</div>
      </button>
    </div>
  );
}

export default AddShoppingItem;