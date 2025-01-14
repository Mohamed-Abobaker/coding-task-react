import './App.css';
import Donations from './donations';
import AddDonation from './addDonation';
import React, { useState, useEffect } from "react";

function App() {
  const baseUrl = 'https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems';
  const [donations, setDonations] = useState([]);
  const [themes, setThemes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [trigger, setTrigger] = useState(1)

  useEffect(() => {
    Promise.all([
      fetch(`${baseUrl}/all`).then((value) => value.json()),
      fetch(`${baseUrl}/themes`).then((value) => value.json()),
      fetch(`${baseUrl}/locations`).then((value) => value.json()),
    ])
      .then((data) => {
        setDonations(data[0])
        setThemes(data[1]);
        setLocations(data[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trigger]);

  return (
    <div className="App">
      <AddDonation trigger={trigger} setTrigger={setTrigger} themes={themes} locations={locations} donations={donations} baseUrl={baseUrl}/>
      <Donations donations={donations}/>
    </div>
  );
}

export default App;
