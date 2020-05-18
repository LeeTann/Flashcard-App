import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'

export const UpdateFlashcard = ({ currentCard }) => {
  const { updateFlashcard } = useContext(GlobalContext)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")


  const handleSubmit = e => {
    e.preventDefault()
   
    const updatedCardInfo = {
      question,
      answer
    }

    updateFlashcard(currentCard._id, updatedCardInfo)
  }

  return (
    <>
      <h3>Update current Card</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor={question}>Question</label>
          <input 
            type="text"
            value={question}
            placeholder="Enter question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor={answer}>Answer</label>
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

