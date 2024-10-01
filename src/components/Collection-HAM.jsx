import { useEffect, useState } from 'react'
import { getAllHarvardObjects } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCardHAM from './ObjectCard-HAM'

export default function CollectionHAM () {
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [objects, setObjects] = useState([])
    const [info, setInfo] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getAllHarvardObjects()
        .then(response => {
            const {info, records} = response.data
            setInfo(info)
            setObjects(...[records])
        })
        .catch(err => setIsError(true))
        .finally(() => {setIsLoading(false)})
    }, [])

    { if (isError) {
        return <Error msg="Data Fetch Unsuccessful, Please Try Again"/>
    }}

    return ( isLoading ? <Loading msg="Loading Harvard Collection..."/> : 
        <section>
            <div className="collection">
                { objects.map(object => {
                    return <ObjectCardHAM key = {object.objectid} object={object}/>
                })}
            </div>
            <div className="filter">
                <h3> Filter By Department </h3>
            </div>
        </section>
    )
}