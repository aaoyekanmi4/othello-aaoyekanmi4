import React from 'react'


import './StartScreen.css';
const StartScreen = () => {

 
  return (
    <div id="start-screen">
       <div id="container">
      <h1 id="game-title">PLAY OTHELLO!!</h1>
    
      <form>
        <p>
          <label>
            <input type="radio" checked={true}></input>
                No time limit
              </label>
        </p>
        <p>
          <label>
            <input type="radio"></input>
                SPEED OTHELLO: 30 second time limit
              </label>
        </p>
        <input id="start-button" type="submit" value="Start Game!" />
      </form>
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
