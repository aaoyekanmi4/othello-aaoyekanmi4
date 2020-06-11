import React from "react";
import Row from "../Row/Row";
import "./Board.css";

const Board = ({ board, handlePlacingPiece }) => {
  const generateBoard = () => {
    return board.map((row, index) => {
      return (
        <Row
          key={index}
          cellData={row}
          handlePlacingPiece={handlePlacingPiece}
        />
      );
    });
  };
  return <div id="board">{generateBoard()}</div>;
};

export default Board;
