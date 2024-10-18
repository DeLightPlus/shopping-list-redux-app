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

    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
    const timeoutId = setTimeout(() => { setShowWelcome(false);
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);

    const HandleShowAddForm = () => 
    {
      setShowAddForm();
    }

  return (
    <>
        { showWelcome && <h1>Welcome to the Dashboard!</h1> }
        {console.log(user, ' | ', showAddForm)        }
                
        {
         showAddForm ? 
          <AddShoppingItem setShowAddForm={ setShowAddForm }/> : 
          <button className="addItem_btn" onClick={() => setShowAddForm(true)}>
            Add Shopping Item
          </button> 
        }
        <SharedShoppingList/> 
        <ShoppingList/>
    </>
  );
}

export default Dashboard;