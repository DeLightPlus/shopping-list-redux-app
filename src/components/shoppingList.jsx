import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShoppingItem, editShoppingItem, updateItemQuantity } from '../redux/shoppingListReducer';

const ShoppingList = () => {
  const shoppingList = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editQuant, setEditQuant] = useState(0);

  const handleDecrement = (item) => 
  {    
    if (item.quantity > 1) 
    {    
      dispatch( updateItemQuantity({id: item.id, shoppingItem: item.shoppingItem, quantity: item.quantity-1}) );
    }
  };
 

  return (
    <ul>
      {shoppingList.map((item) => (
        <li key={item.id}>
          {editing === item.id ? (
            <EditForm
              item={item}
              editInput={editInput}
              setEditInput={setEditInput}
              editQuant={editQuant}
              setEditQuant={setEditQuant}
              setEditing={setEditing}
              dispatch={dispatch}              
            />
          ) : (
            <ShoppingItem
              item={item}
              setEditing={setEditing}
              setEditInput={setEditInput}
              editQuant={editQuant}
              setEditQuant={setEditQuant}
              dispatch={dispatch}             
            />
          )}
        </li>
      ))}
    </ul>
  );
};




const EditForm = ({ item, editInput, setEditInput, editQuant, setEditQuant, setEditing, dispatch }) => (
  <div className='shopping-list-item' id='edit-form'>
    <input  type="text" value={editInput}
      onChange={(e) => setEditInput(e.target.value)}
    />

    <div className='inc_dec_quant'>
        <button onClick={() => setEditQuant(editQuant-1)}>
            <div className='icn'>➖</div>
        </button>
        
        <span>{editQuant}</span>

        <button onClick={() => setEditQuant(editQuant+1)}>
        <div className='icn'>➕</div>
        </button>
    </div>
    
    <button id='update'
      onClick={() => {
        dispatch( editShoppingItem({ id: item.id, shoppingItem: editInput, quantity: editQuant }));
        setEditing(null);
        setEditInput('');
      }}
    >
      <div className='icn'>♲</div> {/*🔃🔄*/}
    </button>
  </div>
);

const ShoppingItem = ({ item, setEditing, setEditInput, dispatch}) => (
  <div className='shopping-list-item '>
    <span>{item.shoppingItem}</span>
    <div className='inc_dec_quant'>
        {/* <button onClick={() => handleDecrement(item)}>
            <div className='icn'>➖</div>
        </button> */}
        
        <span>{item.quantity}</span>

        {/* <button onClick={() =>  dispatch( 
            updateItemQuantity({id: item.id, shoppingItem: item.shoppingItem, quantity: item.quantity+1})  
            )}>
        <div className='icn'>➕</div>
        </button> */}
    </div>
    
    <button
      onClick={() => {
        setEditing(item.id);
        setEditInput(item.shoppingItem);
      }}
    >
      <div className='icn'>📝</div>
    </button>

    <button id='delete'
        onClick={() => dispatch(deleteShoppingItem(item.id))}>
      <div className='icn'>🗑</div>
    </button>
    &#9617;
  </div>
);

export default ShoppingList;