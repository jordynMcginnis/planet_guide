import axios from 'axios';

export function getPlanets(planet) {
  return axios.get(planet)
}

export function getPlanetName(name) {
  return axios.get(name)
}

export function getResidentInfo(resident) {
  return axios.get(resident)
}

export function getAllResidents(planet) {
  return axios.get(planet)
}
