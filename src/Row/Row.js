import React from 'react'
import './Row.css'
import Cell from '../Cell/Cell';

const Row = ({ cellData }) => {
    const generateCells = (cellData) => {
        return cellData.map(cell => { 
            return <Cell key={cell.id}
                id={cell.id}
                x={cell.x}
                y={cell.y}
                color={cell.color}/>
        })
     }
    return (
        <div class="row">
            {generateCells(cellData)}
        </div>
    )
}

export default Row
