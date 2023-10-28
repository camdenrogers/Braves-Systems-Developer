import React from 'react';
import './StatBox.css';


const StatBox = ({ battingStatName, expectedStatName, battingStat, expectedStat }) => {

    return (
        <div className="stat-box">
          <div className="left-half stat-half">
            <div>
                <h2 className="stat-name">{battingStatName}</h2>
                <div className="stat-value">{battingStat}</div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="right-half stat-half">
            <h2 className="stat-name">{expectedStatName}</h2>
            <div className="stat-value">{expectedStat}</div>
          </div>
        </div>
      );
};


export default StatBox;