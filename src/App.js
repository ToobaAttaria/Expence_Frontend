import './App.css';
import { useState, useEffect } from 'react';
import SideBar from './COMPONENTS/sidebar';
import Cards from './COMPONENTS/cards';
import Transaction from './COMPONENTS/transactios';

function App() {

  const [window, setWindow] = useState(null);
  const [showCategory, setShowCategory] = useState(["Food", "Transport", "Entertainment"]);

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetch("https://expencebackend-production.up.railway.app/expenses")
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.log(err));
  }, []);

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
