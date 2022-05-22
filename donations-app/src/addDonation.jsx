import React, { useState, useEffect } from 'react';

const AddDonation = ({baseUrl}) => {
    const [formData, setFormData] = useState({'Name': '', 'Location': '', 'Theme': '' })
    const [themes, setThemes] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
    Promise.all([
        fetch(`${baseUrl}/themes`).then(value => value.json()),
        fetch(`${baseUrl}/locations`).then(value => value.json())
        ])
        .then((data) => {
            setThemes(data[0]);
            setLocations(data[1]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [baseUrl])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        fetch(`${baseUrl}`, {method: 'POST', body: JSON.stringify(formData), headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },})
    }

    const handleChange = e => {
      e.preventDefault();
      if (e.target.name === 'Price') {
        setFormData({...formData, Price: {currencyCode: 'GBP', amount: Number(e.target.value)}})
      } else {
          setFormData({ ...formData, [e.target.name]: e.target.value})
      }
    }

    return (<div style={{margin: '5%'}}>
      New Donation
      <form onSubmit={onSubmit}>
        <label>
            Name
            <input required={true} minLength={1} maxLength={200} name='Name' onChange={handleChange} value={formData['Name']}/>
        </label>
        <label>
            Location
            <select name='Location' onChange={handleChange} required>
            <option value="" disabled selected>Select location</option>
            {locations.map(e => {
               return (<option key={e.id} value={e.id}>{e.name}</option>)
            })}
      </select>
        </label>
        <label>
            Theme
            <select name='Theme' onChange={handleChange} required>
            <option value="" disabled selected>Select theme</option>
            {themes.map(e => {
               return (<option key={e.id} value={e.id}>{e.name}</option>)
            })}
      </select>
        </label>
        <label>
            Price £
            <input min="0.01" name='Price' type="number" onChange={handleChange}/>
            (GBP)
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>)
}

export default AddDonation;