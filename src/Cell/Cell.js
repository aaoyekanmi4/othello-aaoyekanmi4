import React from 'react';
import './Cell.css';
import PlayableSpace from '../PlayableSpace/PlayableSpace';
import Piece from '../Piece/Piece';

const Cell = ({ color }) => {
    
    const displayCellStatus = (color) => { 
        switch (color) { 
            case "b":
                return <Piece color="black" />
            case "w":
                return <Piece color="white"/>
            case "pw":
                return <PlayableSpace color ="white"/>
            case "pb":
                return <PlayableSpace color="black" />;
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
