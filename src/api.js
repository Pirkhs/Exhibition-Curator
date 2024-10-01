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

export function getMetropolitanObjectsByDepartment (departmentId) {
    return apiMetropolitan.get(`/objects?departmentIds=${departmentId}`)
}

export function getAllHarvardObjects (pageNo = 1) {
    return apiHarvard.get(`/object?apikey=${apiKey}&&size=20&&page=${pageNo}`)
}

