import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from '@mui/x-charts/LineChart';
import './StatGraphBox.css';

const StatGraphBox = ({ statName, statData }) => {
  return (
    <div className="stat-graph-box">
      <div className="chart-container">
        <LineChart
          series={[
            {
              data: statData,
            },
          ]}
          height={150}
        />
      </div>
      <div className="average-stat-data">
        <h2>Average {statName}</h2>
        <p>{calculateAverage(statData)} mph</p>
      </div>
    </div>
  );
};

export default StatGraphBox;

function calculateAverage(values) {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, value) => acc + value, 0);
  return (sum / values.length).toFixed(2);
}
