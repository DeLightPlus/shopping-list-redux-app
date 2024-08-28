import '../App.css';

import AddShoppingItem from './addShoppingItem';
import ShoppingList from './shoppingList';

import { useEffect, useState } from 'react';


function Dashboard() 
{
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
    const timeoutId = setTimeout(() => { setShowWelcome(false);
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);

  return (
    <>
        { showWelcome && <h1>Welcome to the Dashboard!</h1> }
        <AddShoppingItem /> 
        <ShoppingList/>
    </>
  );
}

export default Dashboard;