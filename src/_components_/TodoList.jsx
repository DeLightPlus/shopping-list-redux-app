import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

const TodoList =()=>
{
    const todoList = useSelector((state) => state.todoList);

    return(
        <div>
            
            {
                todoList.map((item) => (
                <div>
                    <li key={item.id}>
                        {item.name} <button>delete</button>
                    </li>                    
                </div>    ))
            }

        </div>
    )
}

export default TodoList;
