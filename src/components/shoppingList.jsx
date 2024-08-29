import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingList, deleteShoppingItem, editShoppingItem } from '../redux/shoppingListReducer';

const ShoppingList = () => {
  const dispatch = useDispatch();

  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  const shoppingList = useSelector((state) => state.shoppingList); 

  

  const [editing, setEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editPrice, setEditPrice] = useState(0); 
  const [editQuant, setEditQuant] = useState(1); 
  const [editExtraNotes, setEditExtraNotes] = useState(1); 

  useEffect(() =>
    {
      if(signedIn)
      {
        dispatch( fetchShoppingList(user.id) );
        console.log('s_list.uid',user.id);   
      }
         
    },[signedIn]);


  useEffect(() =>
    {      
      console.log('s_list',shoppingList);      
    },[signedIn, shoppingList]);


  return (

    <><label htmlFor=""><strong>Estimated Total Expense:</strong></label>
    <ul className='shopping-list'>
      {shoppingList.map((item) => (
        <li key={item.id}>
          {
            editing === item.id ? (
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
    </>
  );
};

const EditForm = ({ item, 
  editInput, setEditInput, 
  editPrice, setEditPrice, 
  editQuant, setEditQuant, 
  setEditing, dispatch }) => (
   
 <div className='shopping-list-item' id='edit-form'>
    <div className='list-item-group'>
      <input  type="text" value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
      />

      <div className='inc_dec_quant' id='price'><sup><b>Price</b></sup>
          <input type='number' value={editPrice}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue < 0) { e.target.value = Math.abs(inputValue); }
                setEditPrice(inputValue);
              }}
            />
      </div>
      
      <div className='inc_dec_quant' id='qty'><sup><b>Qty</b></sup>
          <input type='number' value={editQuant}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue < 0) { e.target.value = Math.abs(inputValue); }
                setEditQuant(inputValue);
              }}
            />
      </div>
      
      <button id='update'
        onClick={() => {
          dispatch( editShoppingItem({ id: item.id, shoppingItem: editInput, quantity: editQuant }));
          setEditing(null);
          setEditInput('');
          setEditQuant(1);
        }}
      >
        <div className='icn'>♲</div> {/*🔃🔄*/}
      </button>
    </div>

    <div className='list-item-group'>
      <textarea />
    </div> 
  </div>
);

const ShoppingItem = ({ item, setEditing, setEditInput, dispatch}) => (
  <div className='shopping-list-item '>
    <div className='list-item-group'>
      <span>{item.shoppingItem}</span>
      <div className='inc_dec_quant' id='price'>            
          <span><small>Price:</small> R{ item.price}</span>        
      </div>

      <div className='inc_dec_quant' id='Qty'>               
          <span><small>Qty:</small> {item.quantity}</span>
      </div>

      <div className='inc_dec_quant' id='total'>                
          <span><small>Total:</small> R{ item.price * item.quantity}</span>
      </div>

      {/* <div> */}
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
      {/* </div> */}
    </div>

    <div className='list-item-group'>
      <textarea />
    </div>  
  </div>
);

export default ShoppingList;