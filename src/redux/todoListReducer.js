import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const todoSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        addTodoItem: (state, action) => 
            {
                state.push(action.payload);
            },

        deleteTodoItem : (state, action) =>
            {
                return state.filter(list=> list.id !==action.payload)

            },

        editTodoItem: (state, action) => 
            {
                console.log(action);
                const { id, todoItem } = action.payload;
                const todoIndex = state.findIndex((todo) => todo.id === id);
                if (todoIndex !== -1)
                {
                    state[todoIndex].todoItem = todoItem;
                }

                return state;

            }

    }
});


export const { addTodoItem , deleteTodoItem, editTodoItem } = todoSlice.actions;
export default todoSlice.reducer;
