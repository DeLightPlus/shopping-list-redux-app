import { useSelector } from 'react-redux';
import '../App.css';

import AddShoppingItem from './AddShoppingItem';
import SharedShoppingList from './SharedShoppingList';
import ShoppingList from './shoppingList';

import { useEffect, useState } from 'react';


function Dashboard() 
{
    const [showWelcome, setShowWelcome] = useState(true);
    const signedIn = useSelector((state) => state.user.signedIn);
    const user = useSelector((state) => state.user);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showList, setShowList] = useState(true);


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
        { showWelcome && <h1>Welcome to the EasyShopper App!</h1> }
        {console.log(user, ' | ', showAddForm) }
        {console.log(showList," | showlist")  }
 
        {
         showAddForm ? 
          <AddShoppingItem setShowAddForm={ setShowAddForm }/> : 
          <div className="addItem_btn">
          <button className="add-shopping-item-button" onClick={() => setShowAddForm(true)}>
            ➕
          </button> </div>
        }

        <SharedShoppingList showList={showList} setShowList={setShowList}/> 

        { showList && <ShoppingList/> }
    </>
  );
}

export default Dashboard;