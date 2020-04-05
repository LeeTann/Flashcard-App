import { GET_FLASHCARDS, ADD_FLASHCARD, DELETE_FLASHCARD, FLASHCARD_ERROR } from './types'

export default (state, action) => {
  switch(action.type) {

    case GET_FLASHCARDS:
      return {
        ...state,
        loading: false,
        flashcards: action.payload
      }
    
    case FLASHCARD_ERROR:
      return {
        ...state,
        error: action.payload
      }
      
    default:
      return state
  }
}