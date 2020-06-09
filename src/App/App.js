import React, { useState, useEffect } from 'react';
import { showPlayableSquares, flipPieces } from '../GameLogic';
import Board from '../Board/Board';

import initialBoardData from "../InitialBoardData";
import './App.css';

function App() {
  const [board, setBoard] = useState(initialBoardData);
  const [connections, setConnections] = useState({});
  const [player1, setPlayer1] = useState( {
      isTurn: false,
      pieces: [
        { x: 3, y: 3, id: 35, color: "b" },
        {
          id: 27, x: 4, y: 4, color: "b",
        },
      ],
  })
  useEffect(() => { 
    const boardCopy = [...board];
    const connectionsCopy = Object.assign({}, connections);
    player1.pieces.forEach((piece) => showPlayableSquares(boardCopy, piece, connectionsCopy));
    setBoard(boardCopy);
    setConnections(connectionsCopy);
    console.log(connectionsCopy);
  }, [])

  const handlePlacingPiece = (id) => { 
    for (let row of board) { 
      for (let col of row) { 
        if (col.id === id) {
          col.color ="b"
         } 
      }
    }
    console.log(id);
    const changedBoard = flipPieces(id, [...board], connections);
    setBoard(changedBoard);

  }
  
  return (
    <div className="App">
      <Board board={board} handlePlacingPiece={handlePlacingPiece}/>
    </div>
  );
}

export default App;
