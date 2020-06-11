import React from 'react'
import './GameOver.css'
const GameOver = ({ player1, player2, resetGame }) => {
 
  //return how many pieces flipped on avg per turn
  const calculateAvgCaptures = (player) => {
    const captureSum = player.captures.reduce((a, b) => a + b);
    const totalMoves = player.captures.length;
    //return avg up to 2 decimal places
    return (captureSum / totalMoves).toFixed(2);
  }  
  const findLargestCapture = (player) => { 
    const largestCapture = Math.max(...player.captures);
    return largestCapture;
  }
    const declareWinner = (player1, player2) => {
        if (player1.pieces.length > player2.pieces.length) {
            return `Player 1 Won!`
        }
        else { 
           return `Player 2 Won!`;
        }

    }
    return (
      <div id="gameover-screen">
        <h1>GAME OVER </h1>
        <h2>{declareWinner(player1, player2)}</h2>
        <div className="player-area">
          <h3 className="player-label">P1</h3>
          <div className="score-box">
            <div id="black-icon"></div>
            <span id="black-score">{player1.pieces.length}</span>
          </div>
        </div>
        <div className="player-area">
          <h3 className="player-label">P2</h3>
          <div className="score-box">
            <span id="white-icon"></span>
            <span id="white-score">{player2.pieces.length}</span>
          </div>
        </div>
        <h3>Stats</h3>
        <h4>Player1</h4>
        <p className="stat">Total moves: {player1.captures.length}</p>
        <p className="stat">
          Average captures per move: {calculateAvgCaptures(player1)}
        </p>
        <p className="stat">Largest capture: {findLargestCapture(player1)} </p>
        <h4>Player2</h4>
        <p className="stat">Total moves: {player2.captures.length}</p>
        <p className="stat">
          Average captures per move: {calculateAvgCaptures(player2)}
        </p>
        <p className="stat">Largest capture: {findLargestCapture(player2)} </p>

        <button id="play-again" onClick={() => resetGame()}>
          Play Again?
        </button>
      </div>
    );
}

export default GameOver
