import React from 'react'
import './FlashCard.css'

export const FlashCard = ({ currentCard, isFront }) => {

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