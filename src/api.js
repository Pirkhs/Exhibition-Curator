import axios from 'axios'
import { apiKey } from './apiKey'

const apiMetropolitan = axios.create({
    baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1'
})

const apiHarvard = axios.create({
    baseURL: 'https://api.harvardartmuseums.org'
})

export function getAllMetropolitanObjects () {
    return apiMetropolitan.get("/objects")
}

export function getMetropolitanObjectById (id) {
    return apiMetropolitan.get(`/objects/${id}`)
}

export function getMetropolitanDepartments (){
    return apiMetropolitan.get(`/departments`)
}

export function getMetropolitanObjectsByDepartment (departmentId) {
    return apiMetropolitan.get(`/objects?departmentIds=${departmentId}`)
}

export function getMetropolitanObjectBySearchTerm (searchTerm) {
    return apiMetropolitan.get(`/search?q=${searchTerm}`)
}

export default function getMetropolitanObjectsByPage (endpoint) {
    return apiMetropolitan.get(endpoint)
}

export function getAllHarvardObjects (pageNo = 1) {
    return apiHarvard.get(`/object?apikey=${apiKey}&&size=20&&page=${pageNo}`)
}

export function getHarvardObjectById (id) {
    return apiHarvard.get(`/object?apikey=${apiKey}&&id=${id}`)
}

export function getHarvardObjectsByClassification (classification) {
    return apiHarvard.get(`/object?apikey=${apiKey}&&classification=${classification}&&size=20`)
}

export function getAllHarvardClassifications () {
    return apiHarvard.get(`/classification?apikey=${apiKey}`)
}

export function getHarvardObjectsBySearchTerm (searchTerm) {
    return apiHarvard.get(`/object?apikey=${apiKey}&&q=title:${searchTerm}&&size=20`)
}

export function getHarvardObjectsByPage(url) {
    return apiHarvard.get(url)
}