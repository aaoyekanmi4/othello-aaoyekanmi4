import React from "react";
import "./Sidebar.css";
import StartScreen from "../StartScreen/StartScreen";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import GameOver from "../GameOver/GameOver";
const SideBar = ({
  blacksTurn,
  player1,
  player2,
  isGameStarted,
  startGame,
  isGameOver,
  alertMsg,
  resetGame,
}) => {
  const displaySideBarContent = (isGameStarted, isGameOver) => {
    if (isGameOver) {
      return (
        <GameOver player1={player1} player2={player2} resetGame={resetGame} />
      );
    }
    if (isGameStarted) {
      return (
        <ScoreBoard
          blacksTurn={blacksTurn}
          player1={player1}
          player2={player2}
          alertMsg={alertMsg}
        />
      );
    } else {
      return <StartScreen startGame={startGame} />;
    }
  };

  return (
    <div id="sidebar">{displaySideBarContent(isGameStarted, isGameOver)}</div>
  );
};

export default SideBar;
