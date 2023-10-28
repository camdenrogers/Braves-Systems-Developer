import React from 'react';
import './StatBox.css';


const StatBox = ({ statName, statValue }) => {

    return (
        <div className="stat-box">
          <h2 className="stat-name">{statName}</h2>
          <div className="stat-value">{statValue}</div>
        </div>
      );
};


export default StatBox;