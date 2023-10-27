import React, { useState, useEffect } from 'react'
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';
import Header from './components/Header';
import './App.css';


function App() {
  
  const [pitchers, setPitchers] = useState([{ }])
  const [batters, setBatters] = useState([{ }])
  
  useEffect(() => {
    fetch("/pitchers").then(
      res => res.json()
    ).then(
      pitchers => {
        setPitchers(pitchers)
      }
    )
  }, [])

  useEffect(() => {
    fetch("/batters").then(
      res => res.json()
    ).then(
      batters => {
        setBatters(batters)
        console.log(batters.data)
      }
    )
  }, [])
  
  const pitchersArray = pitchers.data || [];
  const battersArray = batters.data || [];

  return (
    <div>
      <Navbar />
      <Header />
      <div className="dropdown-container">
        <Dropdown players={pitchersArray} label="Pitcher"/>
        <Dropdown players={battersArray} label="Batter"/>
      </div>
    </div>
  )
}

export default App
