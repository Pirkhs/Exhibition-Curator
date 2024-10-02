import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Error from './Error.jsx'
import Loading from './Loading.jsx'

import { getMetropolitanObjectById } from '../api'

import '../styles/ObjectCard.css'

export default function ObjectCardHAM ({collectionId, objectData, objectId}) { 
    const [object, setObject] = useState({})
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)   

    useEffect(() => {
        if (collectionId === 2) {
            setObject({
                id: objectData.objectid || objectId,
                title: objectData.title,
                image: objectData.primaryimageurl,
            })
            return
        }

        setIsLoading("Loading Object")
        getMetropolitanObjectById(objectId)
        .then(response => {
            setObject({
                id: response.data.objectID,
                title: response.data.title,
                image: response.data.primaryImageSmall
            })
        })
        .catch(() => setIsError("Data Fetch Unsuccessful, Please Try Again"))
        .finally(() => setIsLoading(false))

    }, [])
    
    { if (isError) {
        return <Error msg={isError}/>
    }}

    return isLoading ? <Loading msg={isLoading}/> : (
        <>
            <div className="object-card">
                { object.title ? <p> {object.title} </p> : <Error msg="No Title Data"/>}
                { object.image ? <img src={object.image}/> : <Error msg="No Image Data"/>}
                <p> <span className='object-id'> Id No. </span> {object.id} </p>
                <Link to={`/collections/${collectionId}/${object.id}`}> <button> View More </button> </Link>
            </div>
        </>
    )
}