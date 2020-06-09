import React from 'react';
import './Cell.css';
const Cell = ({ color }) => {
    const displayCellStatus = (color) => { 
        switch (color) { 
            case "b":
                return "b"
            case "w":
                return "w"
            case "pw":
                return "pw"
            case "pb":
                return "pb"
            default:
                return null;
        }

        
    }
    return (
        <div class="square">
            {displayCellStatus(color)}
        </div>
    )
}

export default Cell
