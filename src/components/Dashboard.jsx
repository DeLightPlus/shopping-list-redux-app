import { useSelector } from 'react-redux';
import '../App.css';

import AddShoppingItem from './addShoppingItem';
import SharedShoppingList from './sharedShoppingList';
import ShoppingList from './shoppingList';

import { useEffect, useState } from 'react';


function Dashboard() 
{
    const [showWelcome, setShowWelcome] = useState(true);
    const signedIn = useSelector((state) => state.user.signedIn);
    const user = useSelector((state) => state.user);

    useEffect(() => {
    const timeoutId = setTimeout(() => { setShowWelcome(false);
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);

  return (
    <>
        { showWelcome && <h1>Welcome to the Dashboard!</h1> }
        {console.log(user)        }
        <AddShoppingItem />
        <SharedShoppingList/> 
        <ShoppingList/>
    </>
  );
}

export default Dashboard;