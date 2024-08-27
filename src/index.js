import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShoppingList = createAsyncThunk(
  'shoppingList/fetchShoppingList',
  async () => {
    const response = await axios.get('http://localhost:8000/shoppingList');
    return response.data;
  }
);

export const addShoppingItem = (item) => 
{
    return async (dispatch) => {
      const response = await axios.post('http://localhost:8000/shoppingList', item);
      dispatch({ type: 'shoppingList/addShoppingItem', payload: response.data });
    };
  };

export const removeShoppingItem = (item) => 
{
    return async (dispatch) => {
      const response = await axios.delete(`http://localhost:8000/shoppingList/${item.id}`);
      dispatch({ type: 'shoppingList/removeShoppingItem', payload: item });
    };
  };
  