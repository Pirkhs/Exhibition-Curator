import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Error from './Error.jsx'
import Loading from './Loading.jsx'

import { getMetropolitanObjectById } from '../api'

import '../styles/ObjectCard.css'
import Modal from './Modal.jsx'
import ImageComponent from './Image.jsx'

export default function ObjectCardHAM ({collectionId, objectData, objectId, inExhibition = false}) { 
    const [object, setObject] = useState({})
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState("")   
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModalOpenState = (newState) => {
        setIsModalOpen(newState)
    }

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
        return <article className="object-card"> <Error msg={isError}/> </article>
    }}

    return isLoading ? <Loading msg={isLoading}/> : (
        <>
            { JSON.stringify(object) === "{}" ? <div className="object-card"> <p> Object Removed from Exhibition </p> </div> :
            <article className="object-card">
                { inExhibition ? <button className="btn-remove" onClick={() => handleModalOpenState(true)}> Remove 🗑️ </button> : <></> }
                { object.image ? <ImageComponent src={object.image} alt={`An image of ${object.title}`}/> : <Error msg="No Image Data"/>}
                { object.title ? <p id="object-card-title"> {object.title} </p> : <Error msg="No Title Data"/>} 
                <Link to={`/collections/${collectionId}/${object.id}`}> <button className="btn-view-more"> View More </button> </Link>
                { isModalOpen ? <Modal msg={`Remove "${object.title}" from your exhibition?`} funcConfirm={handleRemoveObject} isModalOpen={true} handleModalOpenState={handleModalOpenState}/> : <></>}
            </article>
            }
        </>
    )
}