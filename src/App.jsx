import { useState } from 'react';
import './App.css';
import AddTodoItem from './components/addtodoItem';
import TodoList from './components/todolist';

function App() 
{  

  return (
    <div className='App'>
      <AddTodoItem />  

      <TodoList/>
           
    </div>
  )
}

export default App
