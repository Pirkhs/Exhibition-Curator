import axios from 'axios'

const apiMetropolitan = axios.create({
    baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1'
})

export function getAllMetropolitanObjects () {
    return apiMetropolitan.get("/objects")
}

export function getMetropolitanObjectById (id) {
    return apiMetropolitan.get(`/objects/${id}`)
}