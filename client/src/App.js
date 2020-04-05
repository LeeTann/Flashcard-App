import React from 'react';
import './App.css';
import { GlobalProvider } from './context/GlobalState'
import { FlashCards } from './components/FlashCards'


function App() {

  return (
    <GlobalProvider>
      <h1>Flash Card App React</h1>
      <FlashCards />
    </GlobalProvider>
  );
}

export default App;
