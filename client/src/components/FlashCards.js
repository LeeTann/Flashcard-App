import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { FlashCard } from './FlashCard'

export const FlashCards = () => {
  const { flashcards, getFlashcards } = useContext(GlobalContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFront, setIsFront] = useState(true)
  
  useEffect(() => {
    getFlashcards()
  }, [])
  
  const handleCardFlip = () => {
    setIsFront(!isFront)
  }

  const handleNextCard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length)
    setIsFront(true)
  }

  const handlePreviousCard = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length )
    setIsFront(true)
  }
  
  const currentCard = flashcards && flashcards.length && flashcards[currentIndex]
  
  return (
    <div>
      <div>
          <div className="progress">{currentIndex + 1}/{flashcards.length}</div>
          <div onClick={handleCardFlip}>
            <FlashCard currentCard={currentCard} isFront={isFront}/>
          </div>
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handlePreviousCard}>Previous</button>
        <button className="btn" onClick={handleNextCard}>Next</button>
      </div>
    </div>
  )
}