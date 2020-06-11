import React, { useEffect } from "react";
import { useGameLogic } from "../useGameLogic";

/* Components */
import Board from "../Board/Board";
import SideBar from "../Sidebar/SideBar";

import "./App.css";

function App() {
  const [
    board,
    player1,
    player2,
    isGameStarted,
    isGameOver,
    blacksTurn,
    handlePlacingPiece,
    resetGame,
    startGame,
    showAllPlayableSquares,
    alertMsg,
  ] = useGameLogic();

  useEffect(() => {
    if (isGameStarted) {
      showAllPlayableSquares();
    }
    // eslint-disable-next-line
  }, [blacksTurn, isGameStarted]);

  return (
    <div className="App">
      <SideBar
        blacksTurn={blacksTurn}
        player1={player1}
        player2={player2}
        isGameStarted={isGameStarted}
        startGame={startGame}
        isGameOver={isGameOver}
        alertMsg={alertMsg}
        resetGame={resetGame}
      />
      <Board board={board} handlePlacingPiece={handlePlacingPiece} />
    </div>
  );
}

export default App;
