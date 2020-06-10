import React, { useState, useEffect } from "react";
import {
  showPlayableSquares,
  flipPieces,
  placePiece,
  clearPlayableMarkers,
} from "../GameLogic";
import Board from "../Board/Board";
import SideBar from "../Sidebar/SideBar";
import initialBoardData from "../InitialBoardData";
import "./App.css";

function App() {
  const [board, setBoard] = useState(initialBoardData);
  const [connections, setConnections] = useState({});
  const [blacksTurn, setBlacksTurn] = useState(true);
  const [player1, setPlayer1] = useState({
    pieces: [
      { id: 36, x: 4, y: 4, color: "b" },
      { id: 27, x: 3, y: 3, color: "b" },
    ],
  });
  const [player2, setPlayer2] = useState({
    pieces: [
      { id: 35, x: 3, y: 4, color: "w" },
      { id: 28, x: 4, y: 3, color: "w" },
    ],
  });

  useEffect(() => {
    showPlayersTurn();
  }, [blacksTurn]);

  const showPlayersTurn = () => {
    const boardCopy = [...board];
    const connectionsCopy = Object.assign({}, connections);
    if (blacksTurn) {
      player1.pieces.forEach((piece) =>
        showPlayableSquares(boardCopy, piece, connectionsCopy)
      );
    } else {
      player2.pieces.forEach((piece) =>
        showPlayableSquares(boardCopy, piece, connectionsCopy)
      );
    }
    setBoard(boardCopy);
    setConnections(connectionsCopy);
  };

  const handlePlacingPiece = (id, active) => {
    let activePlayerSetter;
    let passivePlayerSetter;

    if (active === "black") {
      activePlayerSetter = setPlayer1;
      passivePlayerSetter = setPlayer2;
    } else if (active === "white") {
      activePlayerSetter = setPlayer2;
      passivePlayerSetter = setPlayer1;
    }

    placePiece(id, board, activePlayerSetter);

    const flippedBoard = flipPieces(
      id,
      [...board],
      connections,
      activePlayerSetter,
      passivePlayerSetter
    );

    const clearedBoard = clearPlayableMarkers(flippedBoard);

    setConnections({});
    setBlacksTurn(!blacksTurn);
    setBoard(clearedBoard);
  };

  return (
    <div className="App">
      <Board board={board} handlePlacingPiece={handlePlacingPiece} />
      <SideBar blacksTurn={blacksTurn} player1={player1} player2={player2}/>
    </div>
  );
}

export default App;
