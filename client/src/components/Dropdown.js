import React from 'react'

function Dropdown(props){
    const { players } = props
    console.log(props)
    return(
        <select>
            <option value="">Select Player</option>
            {players.map((player) => (
                <option key={player} value={player}>{player}</option>
            ))}
        </select>
    );
}

export default Dropdown;