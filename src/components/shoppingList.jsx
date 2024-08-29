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
  const [editExtraNotes, setEditExtraNotes] = useState('');

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

    console.log(editing);
    const calculateTotalExpense = (shoppingList) => 
    {
      let totalExpense = 0;
      for (const item of shoppingList) {
        totalExpense += item.price * item.quantity;
      }
      return totalExpense.toFixed(2);
    };
    const totalExpense = calculateTotalExpense(shoppingList);

  return (

    <>
    <div className="expense_search">
      <label><strong>Estimated Total Expense:</strong> R{totalExpense} </label>
      <input placeholder='Search'/>
    </div>

    <ul className='shopping-list'>
      {shoppingList.map((item) => (
        <li key={item.id}>
          {
            editing === item.id ? (
            <EditForm
              item={item}
              setEditing={setEditing}
              editInput={editInput} setEditInput={setEditInput}
              editPrice={editPrice} setEditPrice={setEditPrice}
              editQuant={editQuant} setEditQuant={setEditQuant}
              editExtraNotes={editExtraNotes} setEditExtraNotes={setEditExtraNotes}              
              dispatch={dispatch}              
            />            
          ) : (
            <ShoppingItem
              item={item}
              setEditing={setEditing}
              setEditInput={setEditInput}            
              setEditPrice={setEditPrice}
              setEditQuant={setEditQuant}
              setEditExtraNotes={setEditExtraNotes}
              dispatch={dispatch}             
            />
          )}
        </li>
      ))}
    </ul>
    </>
  );
};

const EditForm = ({ 
  item, setEditing,
  editInput, setEditInput, 
  editPrice, setEditPrice, 
  editQuant, setEditQuant, 
  editExtraNotes, setEditExtraNotes, 
  dispatch }) => (
   
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
          if (editExtraNotes.trim() !== '') 
          {
            dispatch( editShoppingItem({ 
              id: item.id, 
              shoppingItem: editInput, 
              price: editPrice,             
              quantity: editQuant,
              extraNotes: editExtraNotes }));

            setEditing(null);
            setEditInput('');
            setEditPrice(0);
            setEditQuant(1);         
          } 
          else { alert('Please enter some extra notes'); }
        }}
      >
        <div className='icn'>♲</div> {/*🔃🔄*/}
      </button>
    </div>

    <div className='list-item-group'>
      <textarea value={editExtraNotes}
        onChange={(e) => setEditExtraNotes(e.target.value)}/>
    </div> 
  </div>
);

const ShoppingItem = ({ item, 
  setEditing, 
  setEditInput, 
  setEditPrice, 
  setEditQuant, 
  setEditExtraNotes,
  dispatch}) => (
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
        <button onClick={() => {
            setEditing(item.id);
            setEditInput(item.shoppingItem);
            setEditPrice(item.price);
            setEditQuant(item.quantity);
            setEditExtraNotes(item.extraNotes);
          }}>
          <div className='icn'>📝</div>
        </button>

        <button id='delete'
            onClick={() => dispatch(deleteShoppingItem(item.id))}>
          <div className='icn'>🗑</div>
        </button>
      {/* </div> */}
    </div>

    <div className='list-item-group'>
    <textarea value={item.extraNotes} 
        onChange={(e) => {}} />
    </div>  
  </div>
);

export default ShoppingList;