import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { GET_FLASHCARDS, ADD_FLASHCARD, DELETE_FLASHCARD, FLASHCARD_ERROR } from './types'
import axios from 'axios'

const initialState = {
  flashcards: [],
  error: null,
  loading: true,
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // ACTIONS
  // Get flashcards
  async function getFlashcards() {
    try {
      const res = await axios.get('/api/flashcard')
      console.log(res)
      dispatch({
        type: GET_FLASHCARDS,
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: FLASHCARD_ERROR,
        payload: err
      })
    }
  }

  // Add a flashcard
  async function addFlashcard(newFlashcard) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const res = await axios.post('/api/flashcard', newFlashcard, headers)

      dispatch({
        type: ADD_FLASHCARD,
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: FLASHCARD_ERROR,
        payload: err
      })
    }
  }

  return (
    <GlobalContext.Provider value={{
      flashcards: state.flashcards,
      error: state.error,
      loading: state.loading,
      getFlashcards,
      addFlashcard
    }}>
      {children}
    </GlobalContext.Provider>
  )
}