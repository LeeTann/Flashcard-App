import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { GET_FLASHCARDS, ADD_FLASHCARD, DELETE_FLASHCARD, UPDATE_FLASHCARD, FLASHCARD_ERROR } from './types'
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
        payload: err.response.data.error
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
        payload: err.response.data.error
      })
    }
  }

  // Get a flashcard by ID


  // Delete a flashcard
  async function deleteFlashcard(id) {
    try {
      await axios.delete(`api/flashcard/${id}`)

      dispatch({
        type: DELETE_FLASHCARD,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: FLASHCARD_ERROR,
        payload: err.response.data.error
      })
    }
  }

  // Update a flashcardupdatedCardInfo
  async function updateFlashcard(updatedCardInfo) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const res = await axios.put(`/api/flashcard/${updatedCardInfo._id}`, updatedCardInfo, headers)

      dispatch({
        type: UPDATE_FLASHCARD,
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: FLASHCARD_ERROR,
        payload: err.response.data.error
      })
    }
  }

  return (
    <GlobalContext.Provider value={{
      flashcards: state.flashcards,
      error: state.error,
      loading: state.loading,
      getFlashcards,
      addFlashcard,
      deleteFlashcard,
      updateFlashcard
    }}>
      {children}
    </GlobalContext.Provider>
  )
}