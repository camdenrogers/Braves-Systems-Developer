import React from 'react';
import './Dropdown.css';


const Dropdown = ({ players, selectedOption, onSelectOption, label }) => {

    const handleDropdownChange = (event) => {
        onSelectOption(event.target.value)
    };

    return(
        <div className="custom-dropdown">
            <label htmlFor="dropdown">Select a {label}</label>
            <div className="select-container"></div>
            <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
                <option value={`All ${label}s`}>All {label}s</option>
                {players.map((player) => (
                    <option key={player} value={player}>{player}</option>
                ))}
            </select>
        </div>
    );
}


export default Dropdown;