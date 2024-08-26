import { configureStore } from "@reduxjs/toolkit";
import todoSlice from  '../redux/todoListReducer'

export const store = configureStore ({
    reducer: {
        todoList:todoSlice

    }
})