import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalState'
import './App.css';

import Navbar from './components/navbar/Navbar';
import Homepage from './components/homepage/Homepage';
import About from './components/about/About';
import FlashCards from './components/flashcard/FlashCards'
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <div>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/flashcard' component={FlashCards} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </div>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
