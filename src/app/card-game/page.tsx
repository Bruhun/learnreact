"use client"
import { useState } from "react";
import styles from "./card-game.module.css";

export default function CardGame() {
  const [gameState, setGameState] = useState({
    deck: [],
    hand: [],
    score: 0,
    isGameStarted: false
  });

  const startGame = () => {
    // Initialize your game logic here
    setGameState({
      ...gameState,
      isGameStarted: true
    });
  };

  return (
    <div className={styles.container}>
      <h1>Card Game</h1>
      
      {!gameState.isGameStarted ? (
        <div className={styles.startScreen}>
          <p>Welcome to the Card Game!</p>
          <p>Click the button below to start playing.</p>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className={styles.gameBoard}>
          <div className="score">Score: {gameState.score}</div>
          <div className="hand">
            {/* Render cards in hand */}
            {gameState.hand.map((card, index) => (
              <div key={index} className="card">
                {/* Card content */}
              </div>
            ))}
          </div>
          <div className="deck">
            {/* Render deck */}
            <div className="card card-back">Deck ({gameState.deck.length})</div>
          </div>
        </div>
      )}
    </div>
  );
}