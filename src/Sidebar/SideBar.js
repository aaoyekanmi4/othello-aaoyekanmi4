import React from "react";
import "./Sidebar.css";

import StartScreen from "../StartScreen/StartScreen";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
const SideBar = ({
  blacksTurn,
  player1,
  player2,
  timedGame,
  isGameStarted,
  handleInputChange,
  startGame
}) => {
  return (
    <div id="sidebar">
      {!isGameStarted && (
        <StartScreen
          timedGame={timedGame}
          handleInputChange={handleInputChange}
          startGame={startGame}
        />
      )}
      {/* //<ScoreBoard blacksTurn={blacksTurn} player1={player1} player2={player2} timedGame={timedGame}/> */}
    </div>
  );
};

export default SideBar;
