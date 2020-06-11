import React from "react";
import "./Piece.css";
const Piece = (props) => {
  return <div class="piece" style={{ backgroundColor: props.color }}></div>;
};

export default Piece;
