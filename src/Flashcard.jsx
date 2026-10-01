import React, { useState, useEffect } from 'react';

export default function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-reset flip state when the card content changes (e.g., during shuffle)
  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <div className="scene" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-face card-front">
          <div className="chip">Question</div>
          <p>{card.question}</p>
        </div>
        <div className="card-face card-back">
          <div className="chip">Answer</div>
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
}