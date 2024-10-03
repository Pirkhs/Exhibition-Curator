import { useEffect, useState } from 'react'
import { getAllHarvardClassifications, getAllHarvardObjects, getHarvardObjectsByClassification } from '../api'

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

    useEffect(() => {
        setIsLoading("Loading classifications")
        getAllHarvardClassifications()
        .then(response => {
            const classifications = response.data.records
            setClassifications(classifications.map((classification) => classification.name))
        })
        .catch((err) => {setIsError(`${err}`)})
        .finally(setIsLoading(false))
    }, [])

    useEffect(() => {
        setIsLoading("Filtering collection...")
        getHarvardObjectsByClassification(classificationFilter)
        .then(response => setObjects(response.data.records))
        .catch((err) => setIsError(`${err}`))
        .finally(setIsLoading(false))
            
        
    }, [classificationFilter])

    useEffect(() => {
        setIsLoading("Loading collection...")
        getAllHarvardObjects()
        .then(response => {
            const {info, records} = response.data
            setInfo(info)
            setObjects(...[records])
        })
        .catch((err) => setIsError(`${err}`))
        .finally(() => {setIsLoading(false)})
    }, [])

    if (isError) return <Error msg={isError}/>

    return ( isLoading ? <Loading msg={isLoading}/> : 
        <section>
            { objects.length === 0 ? <p className="collection"> No objects to show </p> :
            <div className="collection">
                { objects.map(object => {
                    return <ObjectCard key = {object.objectid} objectData={object} collectionId={2}/>
                })}
            </div>
            }
            <div className="filter">
                <h3> Filter By Classification </h3>
                <div className="filter-buttons">
                { classifications.map(classification => {
                    return <button key = {classification} onClick={() => setClassificationFilter(`${classification}`)}>{classification}</button>
                })}
                </div>
            </div>
        </section>
    )
}