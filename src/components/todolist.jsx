import { useSelector, useDispatch } from "react-redux";
import { deleteTodoItem, editTodoItem } from  '../redux/todoListReducer';

import { useState } from "react";

function TodoList() 
{
    const todoList = useSelector(state => state.todoList);
    const dispatch = useDispatch() ;

    const [editingTodo, setEditingTodo] = useState(null);
    const [editInput, setEditInput] = useState("");
    
    // console.log(todoList);  

    return (
        <ul>
            {
                todoList.map((item) => (
                <div>                    
                    <li key={item.id}>
                        {
                            editingTodo === item.id ?
                            (
                                <>
                                    <input type="text" value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}/>
                                    <button onClick={() => 
                                        { 
                                            dispatch( editTodoItem({ id: item.id, todoItem: editInput }) );
                                            setEditingTodo(null);
                                            setEditInput('');                                                                                    
                                        }}>update</button>
                                </>
                   
                            ):(
                                <>
                                    {item.todoItem}
                                    <button onClick={() =>
                                        {
                                            setEditingTodo(item.id);
                                            setEditInput(item.todoItem);

                                        }}>Edit</button>

                                    <button onClick={()=> dispatch(deleteTodoItem(item.id))}>delete</button>
                                </>                                
                            )
                        }
                    </li>

                    
                </div>
            ))}
        </ul>
    );
}

export default TodoList;
