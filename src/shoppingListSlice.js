// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const url = 'http://localhost:8000/shoppingList';

// export const fetchShoppingList = createAsyncThunk(
//   'shoppingList/fetchShoppingList',
//   async () => {
//     const response = await axios.get(url);
//     console.log('fetch.resp', response);
    
//     return response.data;
//   }
// );

// export const addShoppingItem = (item) => 
// {
//     return async (dispatch) => {
//       const response = await axios.post(url, item);
//       dispatch({ type: 'shoppingList/addShoppingItem', payload: response.data });
//     };
//   };

// export const deleteShoppingItem = (item) => 
// {
//     return async (dispatch) => {
//       const response = await axios.delete(`${url}/${item.id}`);
//       dispatch({ type: 'shoppingList/deleteShoppingItem', payload: item });
//     };
//   };
  

// // Slice
// const shoppingListSlice = createSlice({
//   name: 'shoppingList',
//   initialState: [],
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchShoppingList.fulfilled, (state, action) => action.payload)
//       .addCase(addShoppingItem.fulfilled, (state, action) => 
//         {
//           state.push(action.payload);
//         })
//       .addCase(deleteShoppingItem.fulfilled, (state, action) => 
//         {
//           return state.filter((item) => item.id !== action.payload);
//         });
//   },
// });

// export default shoppingListSlice.reducer;