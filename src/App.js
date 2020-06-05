import React from 'react';
import { Route } from "react-router-dom";
import Residents from './Residents';
import Planets from './Planets';
import Resident from './Resident';
import './index.css';
import image from './images/starwarsLogo.png'

function App() {
  return (
    <div className='stars'>
      <div className='twinkling'>
        <div className='app'>
          <img className='image'src={image} alt="starwars" />
          <Route exact path='/' component={Planets}/>
          <Route exact path='/residents/:planet' component={Residents}/>
          <Route exact path='/residents/:planet/:resident' component={Resident}/>
        </div>
      </div>
    </div>
  );
}

export default App;
