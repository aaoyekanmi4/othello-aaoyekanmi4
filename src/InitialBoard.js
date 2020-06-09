/**
 * The board is initialized to a 2D array.
 * Each cell is respresented by an object with the format {id, x, y, color};
 */

const BOARD_SIZE = 8;

const board = Array.from(Array(BOARD_SIZE), () =>
    new Array(BOARD_SIZE).fill(null)
);


let id = 0;

for (let x = 0; x < BOARD_SIZE; x++) {
  for (let y = 0; y < BOARD_SIZE; y++) {
    //for central squares, place inital white and black pieces
    if ((x === 3 && y === 3) || (x === 4 && y === 4)) {
      board[x][y] = { id, x, y, color: "b" };
    }
    else if ((x === 4 && y === 3) || (x === 3 && y === 4)) {
      board[x][y] = { id, x, y, color: "w" };
    }
    //make all other squares empty
    else {
        board[x][y] = {id, x, y, color:null}
    }
    id++;
  }
}

export default board;
