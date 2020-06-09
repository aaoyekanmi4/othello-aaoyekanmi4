import React from 'react'
import Row from '../Row/Row';
import './Board.css';


const Board = ({ board }) => {
    
    
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
