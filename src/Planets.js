import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getId } from './utils/helpers'
import Breadcrumbs from './Breadcrumbs.js'
import { getPlanets } from './utils/api.js'

export default function Planets () {
  const [planets, setPlanets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState('https://swapi.dev/api/planets/')
  const [planetsApi, setPlanetsApi] = useState({})

  useEffect(() => {
    getPlanets(page)
      .then(({ data : allPlanets }) => {
        setPlanetsApi(allPlanets);
        const filteredPlanets = allPlanets.results.filter(({ name }) =>
          name.toLowerCase().includes(searchTerm)
        );
        setPlanets(filteredPlanets);
      })
      .catch(err => {
        console.log(err)
      });

  }, [searchTerm, page])

  return (
    <div className='list'>
      <Breadcrumbs>/All Planets</Breadcrumbs>
      <input className='search' onChange={({ target }) => setSearchTerm(target.value.toLowerCase())}/>
      {planets.map(planet => (
        <Link
          className='item'
          to={`/residents/${getId(planet.url)}`}
          key={planet.name}>
          {planet.name}
        </Link>
      ))}
      <div className='buttons'>
        {planetsApi.previous && (
          <button
            className='button'
            onClick={() => setPage(planetsApi.previous)}>
            Previous Page
          </button>
        )}
        {planetsApi.next && (
          <button
            className='button'
            onClick={() => setPage(planetsApi.next)}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}
