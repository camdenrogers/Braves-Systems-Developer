import React, { useState, useEffect } from 'react'
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';
import Header from './components/Header';
import StatBox from './components/StatBox';
import './App.css';


function App() {
  
  const [pitchers, setPitchers] = useState([{ }])
  const [batters, setBatters] = useState([{ }])
  const [battingAverage, setBattingAverage] = useState([{ }])
  const [selectedPitcher, setSelectedPitcher] = useState('All Pitchers')
  const [selectedBatter, setSelectedBatter] = useState('All Batters')
  
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
      }
    )
  }, [])

  useEffect(() => {
    fetch("/batters").then(
      res => res.json()
    ).then(
      batters => {
        setBatters(batters)
      }
    )
  }, [])


  useEffect(() => {
    // Define the base API URL
    const apiUrlBase = '/data';
    // Construct the complete API URL with query parameters
    const apiUrl = `${apiUrlBase}?pitcher=${selectedPitcher}&batter=${selectedBatter}`;
    fetch(apiUrl).then(
      res => res.json()
    ).then(
      battingAverage => {
        setBattingAverage(battingAverage)
        console.log("battingAverage =", battingAverage)
      }
    )
  }, [selectedPitcher, selectedBatter])


  const handleSelectPitcher = (newOption) => {
    setSelectedPitcher(newOption);
  };

  const handleSelectBatter = (newOption) => {
    setSelectedBatter(newOption);
  };

  
  const pitchersArray = pitchers.data || [];
  const battersArray = batters.data || [];
  const battingAverageArray = battingAverage.avg || [];


  return (
    <div>
      <Navbar />
      <Header />
      <div className="dropdown-container">
        <Dropdown players={pitchersArray} selectedOption={selectedPitcher} onSelectOption={handleSelectPitcher} label="Pitcher"/>
        <Dropdown players={battersArray} selectedOption={selectedBatter} onSelectOption={handleSelectBatter} label="Batter"/>
      </div>
      <div className='left-stats'>
        <StatBox battingStatName="AVG" expectedStatName="xBA" battingStat={battingAverageArray} expectedStat={battingAverageArray}/>
        <StatBox battingStatName="OBP" expectedStatName="xwOBA" battingStat={battingAverageArray} expectedStat={battingAverageArray} />
        <StatBox battingStatName="SLG" expectedStatName="xSLG" battingStat={battingAverageArray} expectedStat={battingAverageArray} />
        <StatBox battingStatName="K%" expectedStatName="BB%" battingStat={battingAverageArray} expectedStat={battingAverageArray} />
        <StatBox battingStatName="HR" expectedStatName="HR%" battingStat={battingAverageArray} expectedStat={battingAverageArray} />
      </div>
    </div>
  )
}
export default App