import React, { useState, useEffect } from 'react';
import { showPlayableSquares, flipPieces } from '../GameLogic';
import Board from '../Board/Board';

import initialBoardData from "../InitialBoardData";
import './App.css';

function App() {
  const [board, setBoard] = useState(initialBoardData);
  const [player1, setPlayer1] = useState( {
      isTurn: false,
      pieces: [
        { x: 3, y: 3, id: 33, color: "b" },
        {
          id: 25, x: 4, y: 4, color: "b",
        },
      ],
  })
  useEffect(() => { 
const boardCopy = [...board];
    player1.pieces.forEach((piece) => showPlayableSquares(boardCopy, piece));
    setBoard(boardCopy)
    console.log(board);
  }, [])
  
  
  return (
    <div className="App">
      <Board board={board}/>
    </div>
  );
}

export default App;
