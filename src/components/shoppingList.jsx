import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingList, deleteShoppingItem, editShoppingItem, searchShoppingList } from '../redux/shoppingListReducer';
import axios from 'axios';
import { SORT_OPTIONS, shoppingCategories } from '../constants';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  const shoppingList = useSelector((state) => state.shoppingList);
  
  const [editing, setEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editPrice, setEditPrice] = useState(0); 
  const [editQuant, setEditQuant] = useState(1); 
  const [editType, setEditType] = useState(''); 
  const [editCategory, setEditCategory] = useState(''); 
  const [editExtraNotes, setEditExtraNotes] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.NAME_ASC);
  const [listTypeFilter, setListTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState('');

  const [emailToShare, SetEmailToShare] =  useState('');
  const [toShareData, setToShareData] = useState({});

  useEffect(() => {
    if (signedIn) {
      dispatch(fetchShoppingList(user.id));
    }
  }, [signedIn, user.id, dispatch]);

  useEffect(() => {
    // Console log for debugging
    console.log('shoppingList', shoppingList);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const calculateTotalExpense = (shoppingList) => {
    return shoppingList.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const totalExpense = calculateTotalExpense(shoppingList);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm && user) {
      dispatch(searchShoppingList({ searchTerm, uid: user.id }));
    }
  };

  const handleSort = (items) => {
    switch (sortOption) {
      case SORT_OPTIONS.NAME_ASC:
        return items.slice().sort((a, b) => a.shoppingItem.localeCompare(b.shoppingItem));
      case SORT_OPTIONS.NAME_DESC:
        return items.slice().sort((a, b) => b.shoppingItem.localeCompare(a.shoppingItem));
      case SORT_OPTIONS.PRICE_ASC:
        return items.slice().sort((a, b) => a.price - b.price);
      case SORT_OPTIONS.PRICE_DESC:
        return items.slice().sort((a, b) => b.price - a.price);
      case SORT_OPTIONS.QUANTITY_ASC:
        return items.slice().sort((a, b) => a.quantity - b.quantity);
      case SORT_OPTIONS.QUANTITY_DESC:
        return items.slice().sort((a, b) => b.quantity - a.quantity);
      default:
        return items;
    }
  };

  const filteredAndSortedItems = handleSort(
    shoppingList.filter((item) => 
      {
        if (listTypeFilter === "") 
        {
          return true;
        }

        return item.type === listTypeFilter;
      }).filter((item) => !categoryFilter || item.category === categoryFilter)
  );

  const handleShareWithEmail = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailToShare)) {
      alert('Invalid email address');
      return;
    }
    let sender = user;
    let recipient = emailToShare;
    let list_to_share = shoppingList;

    if(sender === recipient)
    {
      alert("You cant share with yourself.")
    }
    else
    {
      let data = { "sender": sender.email , "recipient": recipient, "data": list_to_share};  
      setToShareData(data);    
      console.log(sender.email ,' ,Sharing ShoppingList | ', list_to_share ,' | to: ', recipient);
      
      try 
      {
        const response = await axios.post('http://localhost:8000/shoppingListToShare', data);

          console.log(response.status);
          if(response.status === 201)
          {
              alert('list has been sent to: ' + recipient );
          }
        // Redirect to login page or dashboard
      } 
      catch (error) 
      {
        alert(error.message);
      }
    }

    SetEmailToShare('');
    
  }

  const validateInput = () => {
    if (editInput.trim() === '') {
      alert('Please enter a shopping item');
      return false;
    }
    if (editPrice < 0) {
      alert('Price cannot be negative');
      return false;
    }
    if (editQuant < 1) {
      alert('Quantity must be at least 1');
      return false;
    }
    return true;
  };

  const handleUpdate = () => {
    if (validateInput()) {
      dispatch(editShoppingItem({
        id: editing,
        type: editType,
        shoppingItem: editInput,
        price: editPrice,
        quantity: editQuant,
        category: editCategory,
        extraNotes: editExtraNotes
      }));
      setEditing(null);
      setEditType('');
      setEditInput('');
      setEditPrice(0);
      setEditQuant(1);
      setEditCategory('');
      setEditExtraNotes('');
    }
  };

  return (
    <>
      <form className="expense_search" onSubmit={handleSearch}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'start', flex:'1'}}>  
          <label>
            <strong>Estimated Total Expense:</strong> 
            R{totalExpense} 
          </label><hr/>
          <div className='search-input-button'>
            <input placeholder="Email" value={emailToShare} 
              onChange={(e) => SetEmailToShare(e.target.value)}/>
            <button onClick={handleShareWithEmail}>share</button>
          </div>
        </div>      

        <div className='search-input-button'>
          <input placeholder="Search" value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}/>
          <button type="submit">🔍</button>
        </div>

        <div style={{display:'flex', flexDirection:'column', alignItems:'end'}}>
          <label>
            Sort by:
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {
                  Object.entries(SORT_OPTIONS).map(([key, value]) => (
                  <option key={key} value={value}>
                  {value}
                  </option>
              ))}
            </select>
          </label>
          
          <label>
            Filter by Category:
            <select className="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All</option>
              {shoppingCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>          
          </label>

          <label>
            Filter by List Type:
            <select
              className="category-filter"
              value={listTypeFilter}
              onChange={(e) => setListTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="groceries">Groceries</option>
              <option value="household">Household Items</option>
              <option value="equipment">Equipment</option>
              
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
      </form>        

      <ul className='shopping-list'>
        {filteredAndSortedItems.map((item) => (
          <li key={item.id}>
            {
              editing === item.id ? (
              <EditForm
                item={item}
                setEditing={setEditing}
                editType={editType} setEditType={setEditType}
                editInput={editInput} setEditInput={setEditInput}
                editPrice={editPrice} setEditPrice={setEditPrice}
                editQuant={editQuant} setEditQuant={setEditQuant}
                editCategory={editCategory} setEditCategory={ setEditCategory}
                editExtraNotes={editExtraNotes} setEditExtraNotes={setEditExtraNotes}
                dispatch={dispatch}
                handleUpdate={handleUpdate}
              />            
            ) : (
              <ShoppingItem
                item={item}
                setEditing={setEditing}
                setEditType={setEditType}
                setEditInput={setEditInput}
                setEditPrice={setEditPrice}
                setEditQuant={setEditQuant}
                setEditCategory={setEditCategory}
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
  editType, setEditType,
  editInput, setEditInput, 
  editPrice, setEditPrice, 
  editQuant, setEditQuant,   
  editCategory, setEditCategory,  
  editExtraNotes, setEditExtraNotes, 
  dispatch, handleUpdate
}) => (
  <div className='shopping-list-item' id='edit-form'>
    <div className='list-item-group'>
      <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
      />
      <div className='inc_dec_quant' id='type'>
        <small><b>Type</b></small>
        <input
          type='text'
          value={editType}
          onChange={(e) => { setEditType(inputValue); }}
        />
      </div>

      <div className='inc_dec_quant' id='category'>
        <small><b>Cat.</b></small>
        <select className="category-editselect" 
          onChange={(e) => setEditCategory(e.target.value)}>
          {shoppingCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type='text'
          value={editCategory}
          onChange={(e) => { (e.target.value); }}
        />
      </div>

      <div className='inc_dec_quant' id='price'>
        <small><b>Price</b></small>
        <input
          type='number'
          value={editPrice}
          onChange={(e) => {
            const inputValue = e.target.value;
            setEditPrice(inputValue < 0 ? Math.abs(inputValue) : Math.abs(inputValue));
          }}
        />
      </div>
      <div className='inc_dec_quant' id='qty'>
        <small><b>Qty.</b></small>
        <input
          type='number'
          value={editQuant}
          onChange={(e) => {
            const inputValue = e.target.value;
            setEditQuant(inputValue < 0 ? Math.abs(inputValue) : inputValue);
          }}
        />
      </div>
      <button
        id='update'
        onClick={handleUpdate}
      >
        <div className='icn'>♲</div>
      </button>
    </div>
    <div className='list-item-group'>
      <textarea
        value={editExtraNotes}
        onChange={(e) => setEditExtraNotes(e.target.value)}
      />
    </div>
  </div>
);

const ShoppingItem = ({
  item,
  setEditing,
  setEditType,
  setEditInput,
  setEditPrice,
  setEditQuant,
  setEditCategory,
  setEditExtraNotes,
  dispatch
}) => (
  <div className='shopping-list-item'>
    <div className='list-item-group'>
      <span>{item.shoppingItem} | type: {<small>{item.type}</small>}</span> 
      <div className='inc_dec_quant' id='category'>
        <span>{item.category}</span>
      </div>
      <div className='inc_dec_quant' id='price'>
        <span><small>Price:</small> R{item.price}</span>
      </div>
      <div className='inc_dec_quant' id='Qty'>
        <span><small>Qty:</small> {item.quantity}</span>
      </div>
      <div className='inc_dec_quant' id='total'>
        <span><small>Total:</small> R{item.price * item.quantity}</span>
      </div>
      <button onClick={() => {
        setEditing(item.id);
        setEditType(item.type);
        setEditInput(item.shoppingItem);
        setEditPrice(item.price);
        setEditQuant(item.quantity);
        setEditCategory(item.category);
        setEditExtraNotes(item.extraNotes);
      }}>
        <div className='icn'>📝</div>
      </button>
      <button id='delete' onClick={() => dispatch(deleteShoppingItem(item.id))}>
        <div className='icn'>🗑</div>
      </button>
    </div>

    <div className='list-item-group'>
      <textarea value={item.extraNotes} readOnly />
    </div>
  </div>
);

export default ShoppingList;
