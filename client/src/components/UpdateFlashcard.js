import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const UpdateFlashcard = () => {
  const { flashcards, getFlashcards, updateFlashcard } = useContext(GlobalContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    getFlashcards()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
   
    const updatedCardInfo = {
      question,
      answer
    }

    updateFlashcard(updatedCardInfo)
  }
  const currentCard = flashcards && flashcards.length && flashcards[currentIndex]

  return (
    <>
      <h3>Update current Card</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="question">Question</label>
          <input 
            type="text"
            value={question}
            placeholder="Enter question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="answer">Answer</label>
          <input 
            type="text"
            value={answer}
            placeholder="Enter answer"
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <button className="btn">Update Card</button>
      </form>

    </>
  )
}

