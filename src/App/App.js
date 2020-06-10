import React, { useState, useEffect } from "react";

/* Game logic functions*/
import {
  showPlayableSquares,
  flipPieces,
  placePiece,
  clearPlayableMarkers,
} from "../GameLogic";

/* Components */
import Board from "../Board/Board";
import StartScreen from '../StartScreen/StartScreen';
import SideBar from "../Sidebar/SideBar";
import initialBoardData from "../InitialBoardData";
import "./App.css";

function App() {

  const [board, setBoard] = useState(initialBoardData);
  const [showGameOver, setShowGameOver] = useState(false);
  const [connections, setConnections] = useState({});
  const [playersWhoCantMove, setPlayersWhoCantMove] = useState(0);
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
    checkForGameOver(connectionsCopy, playersWhoCantMove, setPlayersWhoCantMove);
  };

  const checkForGameOver = (
    connectionsCopy,
    playersWhoCantMove,
    setPlayersWhoCantMove
  ) => {
    //if player has no moves change player
    const clickableSquares = Object.keys(connectionsCopy);
    if (!clickableSquares.length) {
      setPlayersWhoCantMove((prevState) => prevState + 1);
      if (playersWhoCantMove === 2) {
        console.log("gameOver");
      } else {
        console.log("turn change");
        setBlacksTurn(!blacksTurn);
      }
    }
  };
  

  const handlePlacingPiece = (id, active) => {
    setPlayersWhoCantMove(0);
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
    
    
    setBoard(clearedBoard);
    checkForGameOver(board);
    setBlacksTurn(!blacksTurn);
  };

  return (
    <div className="App">
      
      <Board board={board} handlePlacingPiece={handlePlacingPiece} />
      <SideBar blacksTurn={blacksTurn} player1={player1} player2={player2}/>
    </div>
  );
}

export default App;
