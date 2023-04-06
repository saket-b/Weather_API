
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';
import Alert from './components/Alert';
import { useState } from 'react';



function App() {


const [alert, setAlert] = useState(null);

  const handleALert = (msg, type)=>{

      console.log("inside handle alert");
      setAlert({
        message : msg,
        type : type,
      })
      console.log("message = ", msg);
      setTimeout(() => {
        setAlert(null)
      }, 1500);
  }


  return (
    <>

      <Router>
        <Navbar />
        <Alert alert= {alert}/>
       <div className='container my-3'>
          <Routes>
          <Route  exact path = '/' element = {<Home  handleALert = {handleALert} />}></Route>
          </Routes>
        </div>
    
       
      </Router>
    </>

  );
}

export default App;
