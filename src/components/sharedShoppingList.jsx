import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SharedShoppingList = () => {
  const user = useSelector((state) => state.user);
  const [sharedLists, setSharedLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  const fetchSharedLists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/shoppingListToShare');
      const sharedLists = response.data.filter((list) => list.recipient === user.email);
      setSharedLists(sharedLists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSharedLists();
  }, [sharedLists]);

  const handleSelectChange = (event) => {
    setSelectedList(event.target.value);
  };

  return (
    <div>
      <select value={selectedList} onChange={handleSelectChange}>
        <option value="">shared shoppingList({sharedLists.length})</option>
        {
          sharedLists.map((list, index) => (
            <option key={index} value={list.sender}>
              {list.sender}'s list
            </option>
          ))
        }
      </select> <button>Clone</button>|<button>Delete</button>

      {
        selectedList && (
          <div>
            <hr/>
            <ul style={{overflow:'auto', height:'40%'}}>
            {
              sharedLists
                .find((list) => list.sender === selectedList)
                .data.map((item) => (
                  <li key={item.id} style={{textAlign:'start'}}>
                    <span>Item: {item.shoppingItem}  </span>
                    <br />
                    <small>Category: {item.category} | </small>
                    <small>Quantity: {item.quantity} | </small>
                    <small>Price: R{item.price} each </small>                    
                    <br/>
                    <small>Extra Notes: {item.extraNotes}</small>
                    <hr/>
                  </li>
                ))
            }
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default SharedShoppingList;