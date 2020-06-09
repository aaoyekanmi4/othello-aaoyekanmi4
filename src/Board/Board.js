import React, { useState } from 'react'
import Row from '../Row/Row';
import './Board.css';
import initialBoardData from '../InitialBoardData';


const Board = () => {
    
    const [board, setBoard] = useState(initialBoardData);
    
    
const generateBoard = () => {
  return board.map((row, index) => {
      return <Row key={index}
                  cellData={board[index]}
          />;
  });
};
    return (
        <div id="board">
            {generateBoard()}
        </div>
    )
}

export default Board
