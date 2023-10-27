import React from 'react';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li id="logo">BattedBallData Analytics</li>
        <li className="nav-link">Batter-Pitcher Matchup Analysis</li>
        <li className="nav-link">Batted Ball Analysis</li>
      </ul>
    </nav>
  );
};

export default Navbar;