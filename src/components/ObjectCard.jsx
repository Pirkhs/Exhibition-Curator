import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Error from './Error.jsx'
import Loading from './Loading.jsx'

import { getMetropolitanObjectById } from '../api'

import '../styles/ObjectCard.css'

export default function ObjectCardHAM ({collectionId, objectData, objectId, inExhibition = false}) { 
    const [object, setObject] = useState({})
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState("")   

    const handleRemoveObject = () => {
        const currExhibition = JSON.parse(localStorage.getItem("Exhibition"))
        const filterExhibition = currExhibition.filter(object => (object.objectId !== objectId) || (object.collectionId !== collectionId))
        localStorage.setItem("Exhibition", JSON.stringify(filterExhibition))
        setObject({})
    }

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
        .catch((err) => setIsError(`${err}`))
        .finally(() => setIsLoading(false))

    }, [])
    
    { if (isError) {
        return <div className="object-card"> <Error msg={isError}/> </div>
    }}

    return isLoading ? <Loading msg={isLoading}/> : (
        <>
            { JSON.stringify(object) === "{}" ? <div className="object-card"> <p> Object Removed from Exhibition </p> </div> :
            <div className="object-card">
                { object.title ? <p> {object.title} </p> : <Error msg="No Title Data"/>}
                { object.image ? <div className="loading-image"> <img src={object.image} alt={object.title} loading="lazy"/> </div> : <Error msg="No Image Data"/>}
                <p> <span className='object-id'> Id No. </span> {object.id} </p>
                <Link to={`/collections/${collectionId}/${object.id}`}> <button className="btn-view-more"> View More </button> </Link>
                <br></br>
                { inExhibition ? <button className="btn-remove" onClick={() => handleRemoveObject()}> Remove 🗑️ </button> : <p></p> }
            </div>
            }
        </>
    )
}