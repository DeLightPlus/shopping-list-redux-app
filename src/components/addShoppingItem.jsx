import { addShoppingItem } from "../redux/shoppingListReducer";

import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";


function AddShoppingItem() 
{
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  if (user) 
  {
    // console.log('Logged-in user:', user);
    // You can access the user's data here, e.g. user.name, user.email, etc.
  }

 
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
    
    setItem("");
    setQuantity('');
    setPrice('');
    setCategory("");
    setExtraNotes("");
  };

  return (
    <div className="add-shopping-item-container">
      <div style={{padding:'0px 8px 0px 0px',border:'darkgrey solid 1px', display:'flex', justifyContent:'space-between'}}>
        <div className="add-shopping-item-group">      
          <label className="add-shopping-item-label">
            ItemName 
          </label>
          <input className="add-shopping-item-input"
            type="text" placeholder="(e.g. Apple)"        
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="add-shopping-item-group">
          <label className="add-shopping-item-label">
            Estimated Price(R) <span></span>
          </label>
          <input className="add-shopping-item-input"
            type="number" placeholder="(e.g. 10)"  value={price}      
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="add-shopping-item-group">
          <label className="add-shopping-item-label">
            Quantity <span>(e.g. x3)</span>
          </label>
          <input className="add-shopping-item-input"
            type="number" placeholder="Quantity"  value={quantity}      
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>        
      </div>

      <div className="calculate-item">
        <span>
          {item && 
            <strong>{item} <sub>x{quantity}</sub> = R{price * quantity}</strong>}
        </span>
      </div>

      <div style={{padding:'0px 1px', display:'flex', justifyContent:'space-between'}}>
        
        <select className="category-select" 
          onChange={(e) => setCategory(e.target.value)}>
          <option value="Beverages">Beverages</option>
          <option value="Bread/Bakery">Bread/Bakery</option>
          <option value="Canned/Jarred Goods">Canned/Jarred Goods</option>
          <option value="Cleaning supplies">Cleaning supplies</option>
          <option value="Dairy">Dairy</option>
          <option value="Dry/Baking Goods">Dry/Baking Goods</option>
          <option value="Fresh Produce">Fresh Produce</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Meat, Fish & Other Proteins">Meat, Fish & Other Proteins</option>   
          <option value="Paper Goods">Paper Goods</option>       
          <option value="Personal Care">Personal Care</option>       
          <option value="Snacks">Snacks</option>
          <option value="Spices & Seasoning">Spices & Seasoning</option>          
          <option value="Other">Other</option>
        </select>
        
        <textarea value={extraNotes} placeholder="Extra Notes:"
          onChange={(e) => setExtraNotes(e.target.value)} />

        <div  style={{display:"flex", flexDirection:"row", gap:"10px"}}>
          <div style={{display:"flex", flexDirection:"column", textAlign:'start'}}>
            <label htmlFor=""><small>List Name/Type</small></label>
            {
              !listTypeInput &&
              <select value={listType} onChange={(e)=> setListType(e.target.value)}>
                {/* <option value="">List name/type</option> */}
                <option value="groceries">Groceries</option>
                <option value="equipment">Household Items</option>
              </select>
            }

            <input placeholder="List Type" style={{width:'100%'}} 
               value={listTypeInput} onChange={(e)=>setListTypeIput(e.target.value)}/>
          </div>
          <button className="add-shopping-item-button"
              onClick={handleAddItem}>
                <div className="icn">➕</div>
          </button>
        </div>   
                
      </div> 
    </div>
  );
}

export default AddShoppingItem;