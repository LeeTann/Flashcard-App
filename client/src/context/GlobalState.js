import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { GET_FLASHCARDS, ADD_FLASHCARD, DELETE_FLASHCARD, UPDATE_FLASHCARD, GET_FLASHCARD, FLASHCARD_ERROR } from './types'
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
  async function getAFlashcard(id) {
    try {
      const res = await axios.get(`/api/flashcard/${id}`)

      dispatch({
        type: GET_FLASHCARD,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: FLASHCARD_ERROR,
        payload: err.response.data.error
      })
    }
  }

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
  async function updateFlashcard(id, updatedCardInfo) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const res = await axios.put(`/api/flashcard/${id}`, updatedCardInfo, headers)
      console.log("res ", res)
      dispatch({
        type: UPDATE_FLASHCARD,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: FLASHCARD_ERROR,
        payload: err.response.data.error
      })
    }
  }

  console.log("state-flash ", state.flashcards)

  return (
    <GlobalContext.Provider value={{
      flashcards: state.flashcards,
      error: state.error,
      loading: state.loading,
      getFlashcards,
      addFlashcard,
      deleteFlashcard,
      updateFlashcard,
      getAFlashcard
    }}>
      {children}
    </GlobalContext.Provider>
  )
}