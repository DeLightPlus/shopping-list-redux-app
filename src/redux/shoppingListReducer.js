import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const shoppingSlice = createSlice({
    name: "shoppingList",
    initialState,
    reducers: {
        addShoppingItem: (state, action) => 
            {
                state.push(action.payload);
            },

        deleteShoppingItem: (state, action) =>
            {
                return state.filter(_list=> _list.id !==action.payload)

            },

        editShoppingItem: (state, action) => 
            {
                console.log(state,' v ',action);
                const { id, shoppingItem, quantity } = action.payload;
                const itemIndex = state.findIndex((_item) => _item.id === id);

                if (itemIndex !== -1)
                {
                    state[itemIndex].shoppingItem = shoppingItem;
                    state[itemIndex].quantity = quantity;
                }

                return state;

            },

        updateItemQuantity: (state, action) => 
            {
                console.log(state,' v ',action);
                
                const item = state.shoppingList.find((item) => item.id === action.payload.id);
                if (item) { item.quantity = action.payload.quantity;  }
            },

    }
});


export const { addShoppingItem , deleteShoppingItem, editShoppingItem, updateItemQuantity  } = shoppingSlice.actions;
export default shoppingSlice.reducer;
