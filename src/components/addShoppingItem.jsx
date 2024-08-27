import { useDispatch } from "react-redux";
import { useState } from "react";
import { addShoppingItem } from "../redux/shoppingListReducer";

function AddShoppingItem() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1); 
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addShoppingItem({ id: Date.now(), shoppingItem: item, quantity: quantity }));
    setItem("");
    setQuantity(1);
  };

  return (
    <div className="add-shopping-item-container">
      <div className="add-shopping-item-group">      
        <label className="add-shopping-item-label">
          Enter Item Name<span>(e.g. Apple)</span>
        </label>
        <input className="add-shopping-item-input"
          type="text" placeholder="Item Name"        
          onChange={(e) => setItem(e.target.value)}
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

      <div>
        <button className="add-shopping-item-button" onClick={handleAddItem}>
          ➕
        </button>
      </div>
    </div>
  );
}

export default AddShoppingItem;