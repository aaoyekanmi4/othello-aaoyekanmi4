import makeInitialBoard from "./InitialBoardData";
import { useState } from "react";

export const useGameLogic = () => {

  /* State */
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [board, setBoard] = useState(makeInitialBoard());
  const [isGameOver, setIsGameOver] = useState(false);
  const [connections, setConnections] = useState({});
  const [playersWhoCantMove, setPlayersWhoCantMove] = useState(0);
  const [blacksTurn, setBlacksTurn] = useState(true);
  const [player1, setPlayer1] = useState({
    captures: [],
    pieces: [
      { id: 36, x: 4, y: 4, color: "b" },
      { id: 27, x: 3, y: 3, color: "b" },
    ],
  });
  const [player2, setPlayer2] = useState({
    captures: [],
    pieces: [
      { id: 35, x: 3, y: 4, color: "w" },
      { id: 28, x: 4, y: 3, color: "w" },
    ],
  });

  /* Game flow functions*/
  const startGame = () => {
    setIsGameStarted(true);
  };

  const changeTurn = () => {
    setAlertMsg("");
    setPlayersWhoCantMove(0);
    setConnections({});

    setBlacksTurn(!blacksTurn);
  };

  const checkForGameOver = (
    connections,
    playersWhoCantMove,
    setPlayersWhoCantMove
  ) => {
    //if player has no moves change player
    const clickableSquares = Object.keys(connections);
    if (!clickableSquares.length) {
      setPlayersWhoCantMove((prevState) => prevState + 1);
      if (playersWhoCantMove === 2) {
        console.log("gameOver");
        setIsGameOver(true);
      } else {
        console.log("turn change");
        setAlertMsg("Turn skipped: no moves");
        setBlacksTurn(!blacksTurn);
      }
    }
  };

  const resetGame = () => {
    setConnections({});
    setAlertMsg("");
    setPlayersWhoCantMove(0);
    setBoard(makeInitialBoard());
    setPlayer1((prevPlayer) => ({
      captures: [],
      pieces: [
        { id: 36, x: 4, y: 4, color: "b" },
        { id: 27, x: 3, y: 3, color: "b" },
      ],
    }));
    setPlayer2((prevPlayer) => ({
      captures: [],
      pieces: [
        { id: 35, x: 3, y: 4, color: "w" },
        { id: 28, x: 4, y: 3, color: "w" },
      ],
    }));
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  /* Main Game Play*/
  const showAllPlayableSquaresOnTurn = () => {
    const boardCopy = [...board];
    const connectionsCopy = Object.assign({}, connections);

    if (blacksTurn) {
      player1.pieces.forEach((piece) =>
        showPlayableSquaresForOnePiece(boardCopy, piece, connectionsCopy)
      );
    } else {
      player2.pieces.forEach((piece) =>
        showPlayableSquaresForOnePiece(boardCopy, piece, connectionsCopy)
      );
    }
    checkForGameOver(
      connectionsCopy,
      playersWhoCantMove,
      setPlayersWhoCantMove
    );

    setBoard(boardCopy);
    setConnections(connectionsCopy);
  };

  const handlePlacingPiece = (id, active) => {
    const newPiece = showNewPieceOnBoard(id, [...board]);
    if (active === "black") {
      addPieceToPlayersPieces(newPiece, setPlayer1);
    } else {
      addPieceToPlayersPieces(newPiece, setPlayer2);
    }

    const flippedPieces = flipPieces(id, [...board], connections);
    if (active === "black") {
      changePieceOwnership(flippedPieces, setPlayer1, setPlayer2);
      countCaptures(flippedPieces, setPlayer1);
    } else {
      changePieceOwnership(flippedPieces, setPlayer2, setPlayer1);
      countCaptures(flippedPieces, setPlayer2);
    }
    const clearedBoard = clearPlayableMarkers([...board]);
    setBoard(clearedBoard);
    checkForGameOver(connections, playersWhoCantMove, setPlayersWhoCantMove);
    changeTurn();
  };

  /* Game Logic */
  const showPlayableSquaresForOnePiece = (board, piece, connections) => {
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

        //if within board dimensions and next square contains opponent piece
        if (
          currentX < board.length &&
          currentX >= 0 &&
          currentY < board.length &&
          currentY >= 0 &&
          board[currentY][currentX].color === opposingColor
        ) {
          /*Add arrays of connected opponent pieces to an object with id of empty square at the end of the chain as the key.
           */
          gatherConnectionsOfOpponentPieces(
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

  const gatherConnectionsOfOpponentPieces = (
    x,
    y,
    offsetX,
    offsetY,
    opposingColor,
    connections,
    board
  ) => {
    let chain = [];

    //while within boundaries of the board
    while (x < board.length && x >= 0 && y < board.length && y >= 0) {
      const adjacentSquare = board[y][x];

      if (adjacentSquare.color === opposingColor) {
        chain.push(adjacentSquare);
        //traverse in same direction if opponent square found
        x += offsetX;
        y += offsetY;
      } else if (adjacentSquare.color === null) {
        //put place marker on empty square by color
        adjacentSquare.color = opposingColor === "b" ? "pw" : "pb";

        connections[adjacentSquare.id] = chain;
        return;
      } else if (
        adjacentSquare.color === "pw" ||
        adjacentSquare.color === "pb"
      ) {
        //case where two chains lead to same empty square, add all pieces to the array at that key
        connections[adjacentSquare.id] = [
          ...connections[adjacentSquare.id],
          ...chain,
        ];
        return;
      }
      //case where piece is same color as player piece
      else {
        return;
      }
    }
  };
  //replace marker(pw or pb) with right color of piece on click
  const showNewPieceOnBoard = (id, board) => {
    for (let row of board) {
      for (let square of row) {
        if (square.id === id) {
          square.color = square.color === "pb" ? "b" : "w";
          return square;
        }
      }
    }
  };

  //helper function to remove an array of values from another array
  const multiFilter = (remaining, valuesToRemove) => {
    if (!valuesToRemove.length) {
      return remaining;
    }
    const lastIndex = valuesToRemove.length - 1;
    remaining = remaining.filter(
      (item) => item.id !== valuesToRemove[lastIndex].id
    );
    valuesToRemove = valuesToRemove.slice(0, lastIndex);
    return multiFilter(remaining, valuesToRemove);
  };

  const clearPlayableMarkers = (board) => {
    for (let row of board) {
      for (let square of row) {
        if (square.color === "pw" || square.color === "pb") {
          square.color = null;
        }
      }
    }
    return board;
  };

  const flipPieces = (id, board, connections) => {
    //flip the color of the pieces where the id matches the key of the connections object
    let piecesToFlip = connections[id];

    for (let piece of piecesToFlip) {
      changePieceColor(board, piece);
    }
    return piecesToFlip;
  };

  const changePieceColor = (board, piece) => {
    board[piece.y][piece.x].color =
      board[piece.y][piece.x].color === "w" ? "b" : "w";
  };
  
  const countCaptures = (flippedPieces, activeSetter) => {
    const numOfCaptures = flippedPieces.length;
    activeSetter((prevPlayer) => ({
      ...prevPlayer,
      captures: [...prevPlayer.captures, numOfCaptures],
    }));
  };

  const addPieceToPlayersPieces = (piece, setPlayerFn) => {
    setPlayerFn((prevPlayer) => ({
      ...prevPlayer,
      pieces: [...prevPlayer.pieces, piece],
    }));
  };

  const changePieceOwnership = (flippedPieces, activeSetter, passiveSetter) => {
    //add pieces to the state of the player who clicked

    activeSetter((prevPlayer) => ({
      ...prevPlayer,
      pieces: [...prevPlayer.pieces, ...flippedPieces],
    }));

    //take the same pieces away from the other player
    passiveSetter((prevPlayer) => {
      const remainingPieces = multiFilter(prevPlayer.pieces, flippedPieces);

      return {
        ...prevPlayer,
        pieces: [...remainingPieces],
      };
    });
  };

  return [
    board,
    player1,
    player2,
    isGameStarted,
    isGameOver,
    blacksTurn,
    handlePlacingPiece,
    resetGame,
    startGame,
    showAllPlayableSquaresOnTurn,
    alertMsg,
  ];
};
