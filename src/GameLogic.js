const connections = {};

const showPlayableSquares = (board, piece) => {
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
      console.log(currentX);
      console.log(currentY);

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
      console.log(chain);
      x += offsetX;
      y += offsetY;
    } else if (board[y][x].color === null) {
      board[y][x].color = opposingColor === "b" ? "pw" : "pb";
      if (!connections[board[y][x].id]) {
        connections[board[y][x].id] = chain;
        return;
      } else {
        connections[board[y][x].id] = [
          ...connections[board[y][x].id],
          ...chain,
        ];
        return;
      }
    } else {
      return;
    }
  }
};



console.log(connections);
const flipPieces = (id, board) => {
  //add piece of players color to the board at id space

  let piecesArr = connections[id];
  for (let piece of piecesArr) {
    board[piece.x][piece.y].color =
      board[piece.x][piece.y].color === "w" ? "b" : "w";
  }
};

export { showPlayableSquares, flipPieces };