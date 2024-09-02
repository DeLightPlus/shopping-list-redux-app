import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingList, searchShoppingList } from '../redux/shoppingListReducer';

import { SORT_OPTIONS } from '../SortOptions';


const SearchItem = () => {
  const dispatch = useDispatch();

  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  const shoppingList = useSelector((state) => state.shoppingList);   

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.NAME_ASC);

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

    // console.log(editing);
    const calculateTotalExpense = (shoppingList) => 
    {
      let totalExpense = 0;
      for (const item of shoppingList) 
      {
        totalExpense += item.price * item.quantity;
      }
      return totalExpense.toFixed(2);
    };
    const totalExpense = calculateTotalExpense(shoppingList);

    const handleSearch = (event) => 
    {
      event.preventDefault();
      if(searchTerm && user)
      {
        console.log(user.id +' try searching for '+ searchTerm);
        dispatch( searchShoppingList({ searchTerm: searchTerm, uid: user.id}) );
      }
        
    };

    const handleSort = (items) => {
        switch (sortOption) {
          case SORT_OPTIONS.NAME_ASC:
            return items.slice().sort((a, b) => a.shoppingItem.localeCompare(b.shoppingItem));
          case SORT_OPTIONS.NAME_DESC:
            return items.slice().sort((a, b) => b.shoppingItem.localeCompare(a.shoppingItem));
          case SORT_OPTIONS.QUANTITY_ASC:
            return items.slice().sort((a, b) => a.quantity - b.quantity);
          case SORT_OPTIONS.QUANTITY_DESC:
            return items.slice().sort((a, b) => b.quantity - a.quantity);
          default:
            return items;
        }
      };

    const filteredAndSortedItems = handleSort(
        shoppingList.filter(item => !categoryFilter || item.category === categoryFilter)
      );

  return (

    <>
    
      
    {/* <ul>
        {
            filteredAndSortedItems.map(item => (
                <li key={item.id}>
                    {item.shoppingItem} - {item.quantity} - {item.category}
                </li>
            ))
        }
      </ul>      {console.log(filteredAndSortedItems)} */}
    
    </>
  );
};

export default SearchItem;