
import './App.css';
import { useState } from 'react';
import SideBar from './COMPONENTS/sidebar';
import Cards from './COMPONENTS/cards';
import Transaction from './COMPONENTS/transactios';

function App() {

  const [window, setWindow] = useState(null);
  const [showCategory, setShowCategory] = useState(["Food", "Transport", "Entertainment"]);
  const [formData, setFormData] = useState([
    {
      category: "Food",
      description: "Lunch at a restaurant",
      date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"), 
      amount: 120,
    },

    {
      category: "Transport",
      description: "Bus fare",
      date: "07-05-2025",
      amount: 50,
    },

    {
      category: "Shopping",
      description: "Bought a new jacket",
      date: "10-06-2025",
      amount: 300,
    }
 
]);




  return (
    <>
      <div className='mainContainer flex'>
        <div className='leftContainer'>
          <SideBar window={window} setShowCategory={setShowCategory} setWindow={setWindow} showCategory={showCategory} formData={formData} setFormData={setFormData} />
        </div>
        <div className='rightContainer'>
          <div className='CardsContainer'>
          <Cards  title="Today" window={window} setWindow={setWindow} formData={formData}/>
          <Cards  title="Weekly" window={window}  setWindow={setWindow} formData={formData} />
          <Cards  title="Monthly"window={window} setWindow={setWindow} formData={formData} />

          </div>
          <div className='Display'>
            <Transaction window={window} setWindow={setWindow} showCategory={showCategory} formData={formData} setFormData={setFormData} />
          </div>
        </div>
      </div>


    </>
  );
}

export default App;
