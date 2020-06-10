import React from 'react'
import './Sidebar.css';
const SideBar = ({ blacksTurn, player1, player2 }) => {
    
    const displayWhoseTurn = () => { 
        return blacksTurn ? "Player1's Turn" : "Player2's Turn"
    }
    return (
      <div id="sidebar">
   
          <h2 id="status">{displayWhoseTurn()}</h2>
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
            <div id="clock">
                <h2>Time to move</h2>
                <h1>0:00</h1>
          </div>
      </div>
    );
}

export default SideBar
