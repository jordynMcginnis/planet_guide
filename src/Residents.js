import React, { useState, useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getId }  from './utils/helpers'
import Breadcrumbs from './Breadcrumbs'
import { getAllResidents, getResidentInfo } from './utils/api.js'

export default function Residents () {
  const { planet } = useParams()
  const { url } = useRouteMatch()
  const [residentsNames, setResidentsNames] = useState([])
  const [planetName, setPlanetName] = useState('')

  useEffect(() => {
    getAllResidents(`https://swapi.dev/api/planets/${planet}`)
      .then(({ data }) => {
        setPlanetName(data.name)
        data.residents.forEach((url) => {
          getResidentInfo(url).then(({data: person}) => {
            setResidentsNames((state) => [...state, person])
          });
        });
      })
      .catch(err => {
        console.log(err)
      });
  },[planet])

  return (
    <div className='list'>
      <Breadcrumbs>/All Planets/{planetName}</Breadcrumbs>
      {residentsNames.length > 0
        ? residentsNames.map((resident, index) => (
            <Link
              to={{
                pathname: `${url}/${getId(resident.url)}`,
                state: {planetName}
              }}
              className='item'
              key={index}>
              {resident.name}
            </Link>
          ))
        : <div className='item'>no residents</div>
      }
    </div>
  )
}