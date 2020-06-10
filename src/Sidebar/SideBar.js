import React from "react";
import "./Sidebar.css";
import StartScreen from "../StartScreen/StartScreen";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
const SideBar = ({
  blacksTurn,
  player1,
  player2,
  isGameStarted,
  startGame,
  isGameOver,
  alertMsg
}) => {
 
  const displaySideBarContent = (isGameStarted) => {
    if (isGameStarted) {
      return (
        <ScoreBoard
          blacksTurn={blacksTurn}
          player1={player1}
          player2={player2}
          alertMsg={alertMsg}
        />
      );
    }
    else { 
      return <StartScreen startGame={startGame}  />;
    }
  };

  return (
    <div id="sidebar">
      {isGameOver ? <div>GameOver</div> : displaySideBarContent(isGameStarted)} 
    </div>
  );
};

export default SideBar;
