import React from 'react';
import './App.css';
import { GlobalProvider } from './context/GlobalState'
import { FlashCards } from './components/FlashCards'
import { AddFlashcard } from './components/AddFlashcard';


function App() {

  return (
    <GlobalProvider>
      <h1>Flash Card App React</h1>
      <AddFlashcard />
      <FlashCards />
    </GlobalProvider>
  );
}

export default App;
