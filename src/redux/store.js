import { configureStore } from "@reduxjs/toolkit";
import shoppingSlice from  '../redux/shoppingListReducer';
import { userSlice } from "./userSlice";

export const store = configureStore ({
    reducer: { 
        user: userSlice.reducer,
        shoppingList: shoppingSlice,
    }
})