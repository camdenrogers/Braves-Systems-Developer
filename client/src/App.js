import React, { useState, useEffect } from 'react'
import Dropdown from './components/Dropdown'; // Import the Dropdown component


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
      <Dropdown players={pitchersArray} />
      <Dropdown players={battersArray} />
    </div>
  )
}

export default App
