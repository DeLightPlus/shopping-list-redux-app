import { configureStore } from "@reduxjs/toolkit";
import shoppingSlice from  '../redux/shoppingListReducer';

export const store = configureStore ({
    reducer: { shoppingList: shoppingSlice }
})