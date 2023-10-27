import React from 'react'
import './Dropdown.css';

const Dropdown = ({ players, label }) => {
    return(
        <div class="custom-dropdown">
            <label for="dropdown">Select a {label}</label>
            <div class="select-container"></div>
            <select id="dropdown">
                <option value="all">All {label}s</option>
                {players.map((player) => (
                    <option key={player} value={player}>{player}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;