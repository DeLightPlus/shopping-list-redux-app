import { useDispatch } from "react-redux";
import { addTodoItem } from "../redux/todoListReducer";
import { useState } from "react";


export default function AddTodoItem()
{
    const [newTodoItem, setNewTodoItem] = useState("");
    const dispatch = useDispatch();

    const addItem = () =>
    {
        dispatch( addTodoItem({ id: Date.now(), name:newTodoItem }) )
    }

    return(
        <div className="add-todo-item">
            <input type="text" placeholder="Enter new item"
                onChange={(e) => setNewTodoItem(e.target.value)}/>
            <button onClick={addItem}>Add</button>            
        </div>
    )
}