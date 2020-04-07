import React, { useContext, useState } from 'react'
import './FlashCard.css'
import { GlobalContext } from '../context/GlobalState'

export const FlashCard = ({ currentCard, isFront }) => {
  // const { flashcards, deleteFlashcard } = useContext(GlobalContext)
  // const [currentIndex, setCurrentIndex] = useState(0)

  
  return (
    <div className="card-container">
      <div className={currentCard ? "card visibility" : "card"}>
        <div className={isFront ? "back card-face " : "front card-face"}>
          <div className={isFront ? "question" : "answer"}>{isFront ? currentCard.question : currentCard.answer}</div>
        </div>
      </div>
    </div>
  )
}