import React from 'react'

const GameOver = ({ player1, player2 }) => {
    const declareWinner = (player1, player2) => {
        if (player1.pieces.length > player2.pieces.length) {
            return `Player 1 Won!\nScore:${player1.pieces.length}`
        }
        else { 
           return `Player 2 Won!\nScore:${player1.pieces.length}`;
        }

    }
    return (
        <div>
            <h1>GAME OVER </h1>
            {declareWinner(player1, player2)}
        </div>
    )
}

export default GameOver
