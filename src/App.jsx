import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import './App.css';

function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('gwynes_flashcards');
    return saved ? JSON.parse(saved) : [
      { id: 1, question: "Welcome to Gwyne's Flashcards!", answer: "Click 'Add Card' to start creating your own!" }
    ];
  });

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    localStorage.setItem('gwynes_flashcards', JSON.stringify(cards));
  }, [cards]);

  const addCard = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setCards([...cards, { id: Date.now(), question, answer }]);
    setQuestion('');
    setAnswer('');
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const shuffleCards = () => {
    setCards([...cards].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="app-container">
      <header className="glass-header">
        <h1>Gwyne’s Flashcard</h1>
        <p>Elevate your learning experience</p>
      </header>

      <section className="form-section">
        <form onSubmit={addCard} className="card-form">
          <input 
            placeholder="Enter Question..." 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
          />
          <input 
            placeholder="Enter Answer..." 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
          />
          <button type="submit" className="btn-primary">Add Card</button>
        </form>
      </section>

      <div className="toolbar">
        <button onClick={shuffleCards} className="btn-secondary">Shuffle Deck ✨</button>
        <span className="card-count">{cards.length} Cards Total</span>
      </div>

      <main className="card-grid">
        {cards.map(card => (
          <div key={card.id} className="card-wrapper">
            <Flashcard card={card} />
            <button className="delete-badge" onClick={() => deleteCard(card.id)}>×</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;