import { useEffect, useState } from 'react'
import { getAllHarvardClassifications, getAllHarvardObjects, getHarvardObjectsByClassification, getHarvardObjectsBySearchTerm } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCard from './ObjectCard'
import Error from './Error'

export default function CollectionHAM () {
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [objects, setObjects] = useState([])
    const [classifications, setClassifications] = useState([])
    const [classificationFilter, setClassificationFilter] = useState(null)
    const [info, setInfo] = useState([])
    const [searchTerm, setSearchTerm] = useState(null)

    useEffect(() => {
        setIsLoading("Loading classifications...")
        getAllHarvardClassifications()
        .then(response => {
            const classifications = response.data.records
            setClassifications(classifications.map((classification) => classification.name))
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [])

    useEffect(() => {
        if (!classificationFilter) return
        setIsLoading("Filtering collection...")
        getHarvardObjectsByClassification(classificationFilter)
        .then(response => {
            setObjects(response.data.records)
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
            
    }, [classificationFilter])

    useEffect(() => {
        setIsLoading("Loading collection...")
        getAllHarvardObjects()
        .then(response => {
            const {info, records} = response.data
            setInfo(info)
            setObjects(...[records])
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        setIsLoading("Searching Collection...")
        getHarvardObjectsBySearchTerm(searchTerm)
        .then(response => {
            setObjects(response.data.records)
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [searchTerm])

    if (isError) return <Error msg={isError}/>

    return ( isLoading ? <div className='container-loading'><Loading msg={isLoading}/> </div> : 
        <>
        <form onSubmit={(e) => {e.preventDefault(); setSearchTerm(e.target["query"].value) }} className="searchbar"> 
            Search for: <input placeholder=" e.g. sunflowers" type="search" name="query" /> 
            <button type="submit">Search</button>
        </form>
        <div className="container-collection">
            <br></br>
            { objects.length === 0 || objects === null ? <p className="collection"> No objects to show </p> :
            <section className="collection">
                { objects.map(object => {
                    return <ObjectCard key = {object.objectid} objectData={object} collectionId={2}/>
                })}
            </section>
            }
            <aside className="filter">
                <h3> Filter By Classification </h3>
                <div className="filter-buttons">
                { classifications.map(classification => {
                    return <button key = {classification} onClick={() => setClassificationFilter(`${classification}`)}>{classification}</button>
                })}
                </div>
            </aside>
        </div>
        </>
    )
}