import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodoItem } from "../redux/todoListReducer";

function AddTodoItem() {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  // Date().now
  // Date.now() ; 

  const handleAddItem = () => 
  {
    dispatch(addTodoItem({ id: Date.now(), todoItem: item }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter item"
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}
export default AddTodoItem;
