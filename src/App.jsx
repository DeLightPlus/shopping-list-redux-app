import { useState } from 'react';
import './App.css';
import AddShoppingItem from './components/addShoppingItem';
import ShoppingList from './components/shoppingList';
import Header from './components/Header';

function App() 
{  

  return (
    <div className='App'>
      <Header/>
      
      <AddShoppingItem /> 
      <ShoppingList/>
           
    </div>
  )
}

export default App
