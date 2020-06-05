import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs'
import { getPlanetName, getResidentInfo } from './utils/api.js'
import { dateFormatter } from './utils/helpers.js'

export default function Resident () {
  const { state } = useLocation()
  const { resident, planet } = useParams()
  const [residentDetails, setResidentDetails] = useState({})
  const [planetName, setPlanetName] = useState(state.planetName)

  useEffect(() => {
    if(!planetName) {
      getPlanetName(`https://swapi.dev/api/planet/${planet}`)
        .then(({ data }) => {
          setPlanetName(data.name)
        });
    }
    getResidentInfo(`https://swapi.dev/api/people/${resident}`)
      .then(({ data }) => {
        setResidentDetails(data)
      })
      .catch(err => {
        console.log(err)
      });
  },[resident, planetName, planet])

  return (
    <ul className='list'>
      <Breadcrumbs> /All Planets/{planetName}/{residentDetails.name}</Breadcrumbs>
      {Object.entries(residentDetails).map(([key, value], index) => {
        if(key === 'created' || key === 'edited') {
          return <li className='item'key={index}>{key}: {`${dateFormatter(value)}`}</li>
        }
        if(Array.isArray(value)) {
          return value.map(item => <li className='item' key={item}>{key} : {item}</li>)
        }
        return <li className='item' key={key}> {key} : {value}</li>
      })}
    </ul>
  )
}