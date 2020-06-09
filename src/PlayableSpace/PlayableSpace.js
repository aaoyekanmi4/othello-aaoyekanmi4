import React from 'react';
import './PlayableSpace.css';

const PlayableSpace = ({ id, color, handlePlacingPiece }) => {
    

    return (
        <div class="playable-space" style={{ borderColor: color}} onClick={()=>handlePlacingPiece(id)}>
            
        </div>
    )
}

export default PlayableSpace
