import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const AddFlashcard = () => {
  const { addFlashcard } = useContext(GlobalContext)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
   
    const newFlashcard = {
      question,
      answer
    }

    addFlashcard(newFlashcard)
    setQuestion("")
    setAnswer("")
  }

  return (
    <>
      <h3>Add a Card</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="question">Question</label>
          <textarea 
            type="text"
            value={question}
            placeholder="Enter question"
            rows="3"
            cols="50"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="answer">Answer</label>
          <textarea 
            type="text"
            value={answer}
            placeholder="Enter answer"
            rows="10"
            cols="50"
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <button className="btn">Add New Card</button>
      </form>

    </>
  )
}

