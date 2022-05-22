import React, { useEffect, useState } from "react";

const Donations = ({baseUrl}) => {
    const [donations, setDonations] = useState([]);
    const [filterState, setFilterState] = useState(false);
    // const [errorState, setErrorState] = useState(false)
    useEffect(() => {
        fetch(`${baseUrl}/all`)
        .then(response =>  response.json())
        .then(data => setDonations(data))
        .catch(error => {
        })
    }, [baseUrl])

    const handleChange = e => {
        e.preventDefault();
        setFilterState(e.target.value);
      }

    let donationsArr = [...donations];
    console.log(donationsArr);
    console.log(filterState);

    if (filterState && filterState !== 'false') donationsArr = donationsArr.filter(({status}) => {
        if (filterState === 'Active') return status.name === 'Active'
        return status.name !== 'Active'
    })


    return <div>
        Donations
        <div>
        <select name='Location' onChange={handleChange} required>
        {['Select filter...', 'Active', 'Non Active'].map((e, i) => {
            return (<option key={e} value={i? e: false}>{e}</option>)
        })}
        </select>
        </div>
        {donationsArr.map(donation => {
            return (<div key={donation.id}  style={{padding: 10, margin: '10%', border: '1px solid black', borderRadius: 25}}> 
                {Object.keys(donation).map(e => {
                    if (['location', 'theme', 'status', 'reference', 'price'].includes(e)) {
                        return (<p key={donation.id+e}>{e}: {donation[e]?.name || donation[e]?.text || 'Not provided!'}</p>)
                    }
                   return (<p key={donation.id+e}>{e}: {donation[e]|| 'Not provided'}</p>)
                })}
            </div>)
        })}
    </div>
}

export default Donations