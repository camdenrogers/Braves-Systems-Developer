import React, { useState, useEffect } from 'react'
import Dropdown from './components/Dropdown';
import Navbar from './components/Navbar';
import Header from './components/Header';
import StatBox from './components/StatBox';
import StatGraphBox from './components/StatGraphBox';
import './App.css';


function App() {
  
  const [pitchers, setPitchers] = useState([{ }])
  const [batters, setBatters] = useState([{ }])
  const [data, setData] = useState([{ }])
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
      data => {
        setData(data)
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
  const battingAverageArray = data.avg || [];
  const slg = data.slg
  const hits = data.hits
  const at_bats = data.at_bats
  const hr = data.hr
  const hr_rate = data.hr_rate
  // const exitVelocities = [90, 92, 88, 95, 91, 93]; // Sample exit velocity data
  const exitVelocities = data.exit_vlo_data
  const launch_angle_data = data.launch_angle_data
  const exit_direction_data = data.exit_direction_data
  const hit_distance_data = data.hit_distance_data
  const hang_time_data = data.hang_time_data
  const hit_spin_rate_data = data.hit_spin_rate_data
  
  if(data.matchups_exist === "True"){
    return (
      <div>
        <Navbar />
        <Header />
        <div className="dropdown-container">
          <Dropdown players={pitchersArray} selectedOption={selectedPitcher} onSelectOption={handleSelectPitcher} label="Pitcher"/>
          <Dropdown players={battersArray} selectedOption={selectedBatter} onSelectOption={handleSelectBatter} label="Batter"/>
        </div>
        <div className="container">
          <div className='left-stats'>
            <StatBox battingStatName="H" expectedStatName="AB" battingStat={hits} expectedStat={at_bats} />
            <StatBox battingStatName="AVG" expectedStatName="xBA" battingStat={battingAverageArray} expectedStat={battingAverageArray}/>
            <StatBox battingStatName="SLG" expectedStatName="xSLG" battingStat={slg} expectedStat={slg} />
            <StatBox battingStatName="HR" expectedStatName="HR%" battingStat={hr} expectedStat={hr_rate} />
          </div>
          <div className='right-stats'>
            <StatGraphBox statName="Exit Velocity" statData={exitVelocities} unit="MPH"/>
            <StatGraphBox statName="Launch Angle" statData={launch_angle_data} unit="Degrees"/>
            <StatGraphBox statName="Exit Direction" statData={exit_direction_data} unit=""/>
            <StatGraphBox statName="Hit Distance" statData={hit_distance_data} unit="ft"/>
            <StatGraphBox statName="Hang Time" statData={hang_time_data} unit="sec"/>
            <StatGraphBox statName="Hit Spin Rate" statData={hit_spin_rate_data} unit="rpms"/>
          </div>
        </div>
      </div>
    )
  } else{
    return (
      <div>
        <Navbar />
        <Header />
        <div className="dropdown-container">
          <Dropdown players={pitchersArray} selectedOption={selectedPitcher} onSelectOption={handleSelectPitcher} label="Pitcher"/>
          <Dropdown players={battersArray} selectedOption={selectedBatter} onSelectOption={handleSelectBatter} label="Batter"/>
        </div>
        <h1 className="no-data">No Batted Ball Data Exists for the Selected Matchup</h1>
      </div>
    ) 
  }

}
export default App