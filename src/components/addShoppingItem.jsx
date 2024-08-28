import { addShoppingItem } from "../redux/shoppingListReducer";
import { signIn, signOut } from '../redux/userSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";


function AddShoppingItem() 
{
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  if (user) {
    console.log('Logged-in user:', user);
    // You can access the user's data here, e.g. user.name, user.email, etc.
  }


  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0); 
  const [price, setPrice] = useState(0);  
  
  

  const handleAddItem = () => {
    dispatch( 
      addShoppingItem({ id: `${Date.now()}`, uid: '2f1d', shoppingItem: item, price: price, quantity: quantity }));
    
    setItem("");
    setQuantity(1);
    setPrice(0)
  };

  return (
    <div className="add-shopping-item-container">
      <div style={{padding:'0px 32px', display:'flex', justifyContent:'space-between'}}>
        <div className="add-shopping-item-group">      
          <label className="add-shopping-item-label">
            Item Name <span></span>
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

        <div className="add-shopping-item-group">Add Item
          <button className="add-shopping-item-button" onClick={handleAddItem}>
            ➕
          </button>
        </div>
      </div>

      <div className="calculate-item">
        <span>{item && <strong>{item} <sup>x{quantity}</sup> = R{price * quantity}</strong>}</span>
      </div>


      
    </div>
  );
}

export default AddShoppingItem;