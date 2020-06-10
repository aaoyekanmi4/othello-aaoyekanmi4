

const showPlayableSquares = (board, piece, connections) => {
  const opposingColor = piece.color === "b" ? "w" : "b";

  //check all squares around for an adjacent opposingColor;
  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      //skip the piece itself
      if (offsetX === 0 && offsetY === 0) {
    
        continue;
      }
      let currentX = piece.x + offsetX;
      let currentY = piece.y + offsetY;
  

      if (
        currentX < board.length &&
        currentX >= 0 &&
        currentY < board.length &&
        currentY >= 0 &&
        board[currentY][currentX].color === opposingColor
      ) {
        traverseUntilEmptySquare(
          currentX,
          currentY,
          offsetX,
          offsetY,
          opposingColor,
            connections,
          board
        );
      }
    }
  }
   

    return board;
};

const traverseUntilEmptySquare = (x, y, offsetX, offsetY, opposingColor, connections, board) => {
  
  
  
  let chain = [];
  //while within boundaries of the board
  while (x < board.length && x >= 0 && y < board.length && y >= 0) {
    if (board[y][x].color === opposingColor) {
      chain.push(board[y][x]);
      console.log(board[y][x])
      x += offsetX;
      y += offsetY;
    } else if (board[y][x].color === null) {
      board[y][x].color = opposingColor === "b" ? "pw" : "pb";
      connections[board[y][x].id] = chain;
      return;
    }
    else if (board[y][x].color ==="pw" ||board[y][x].color ==="pb"){
        
        connections[board[y][x].id] = [
          ...connections[board[y][x].id],
          ...chain,
        ];
        return;
      }
     else {
      return;
    }
  }
};

const placePiece = (id, board) => { 
    
 for (let row of board) { 
      for (let square of row) { 
          if (square.id === id) {
            square.color = square.color === "pb" ? "b" : "w";
              return square;
         } 
      }
    }
}

const multiFilter = (remaining, valuesToRemove) => { 
  if (!valuesToRemove.length) { 
    return remaining;
  }
  const lastIndex = valuesToRemove.length - 1;
  remaining = remaining.filter(item => item.id !== valuesToRemove[lastIndex].id);
  valuesToRemove = valuesToRemove.slice(0, lastIndex);
  return multiFilter(remaining, valuesToRemove);

}

const clearPlayableMarkers = (board) => {
    for (let row of board) { 
        for (let square of row) { 
            if (square.color === "pw" || square.color === "pb") { 
                square.color = null;
            }

        }
    }
    return board
 }

const flipPieces = (id, board, connections, activePlayerSetter, passivePlayerSetter) => {
  

    let piecesToFlip = connections[id];
  for (let piece of piecesToFlip) {
    board[piece.y][piece.x].color =
          board[piece.y][piece.x].color === "w" ? "b" : "w";
      
  }
 
 
       
 activePlayerSetter((prevPlayer) => ({
   ...prevPlayer,
   pieces: [...prevPlayer.pieces, ...piecesToFlip],
 }));
    
 
  
    
    passivePlayerSetter((prevPlayer) => {
      const remainingPieces = multiFilter(prevPlayer.pieces, piecesToFlip);
                   
      
      
        return {
          ...prevPlayer,
          pieces: [...remainingPieces]
        };

    })
    return board;
};

export { showPlayableSquares, flipPieces, placePiece, clearPlayableMarkers };