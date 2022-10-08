import React from 'react'


import './StartScreen.css'
const StartScreen = ({ timedGame, startGame, handleInputChange }) => {

  return (
    <div id="start-screen">
      <div id="container">
        <h1 id="game-title">PLAY OTHELLO!!</h1>
        <button id="start-button" onClick={ startGame }>Start Game!</button>
        <a
          id="how-to"
          href="https://www.ultraboardgames.com/othello/game-rules.php"
          target="blank"
        >
          how to play
        </a>
      </div>
    </div>
  )
}
export default StartScreen
