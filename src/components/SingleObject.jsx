import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getHarvardObjectById, getMetropolitanObjectById } from "../api"

import Error from "./Error"

import '../styles/SingleObject.css'
import Loading from "./Loading"

export default function SingleObject () {
    const {collection_id, object_id} = useParams()
    const [collectionId, objectId] = [+collection_id, +object_id]

    const [object, setObject] = useState({})
    const [isError, setIsError] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToExhibition = () => {
        setIsAdded(true)
        const existingEntries = JSON.parse(localStorage.getItem("Exhibition")) || []          
        const entry = {
            title: object.title || "",
            primaryimageurl: object.primaryImageSmall || object.primaryimageurl || "",
            collectionId,
            objectId: objectId
        }
        localStorage.setItem("entry", JSON.stringify(entry));  
        existingEntries.push(entry);
        localStorage.setItem("Exhibition", JSON.stringify(existingEntries));
    }

    useEffect(() => {
        checkIsAlreadyInExhibition()

        if (collectionId !== 1 && collectionId !== 2) {
            setIsError("Invalid collection ID")
            return
        }

        setIsLoading(true)

        const fetch = collectionId === 1 ? getMetropolitanObjectById(objectId) : getHarvardObjectById(objectId)

        fetch
        .then(response => collectionId === 1 ? setObject(response.data) : setObject(response.data.records[0]))
        .catch(() => setIsError("Unavailable to fetch data"))
        .finally(setIsLoading(false))

    }, [])

    if (isError) return <Error msg={isError}/>

    const checkIsAlreadyInExhibition = () => {
        const objectsInExhibition = JSON.parse(localStorage.getItem("Exhibition")) || []
        if (objectsInExhibition.length === 0) return

        const IdsInExhibition = objectsInExhibition.map(object => `${object.collectionId}/${object.objectId}`)
        setIsAdded(IdsInExhibition.includes(`${collectionId}/${objectId}`))
    }

    
    return isLoading ? <Loading msg="Loading Single Object..."/> : (
        <div className="single-object">
            <ul>
                <h2> {object.title || <Error msg="No title data"/>} </h2>
                <li id="object-id"> Id: {objectId} </li>
                <li> Classification: {object.classification || <Error msg="No classification data"/>} </li>
                <li> Accession Year: {object.accessionYear || object.accessionyear || <Error msg="No accession year data"/>} </li>
                <li> Department: {object.department || <Error msg="No department/division data"/>} </li>
                <li> Credit Line: {object.creditLine || object.creditline || <Error msg="No credit line data"/>} </li>
                <li> Culture: {object.culture || <Error msg="No culture data"/>} </li>
                { object.primaryImageSmall || object.primaryimageurl ? <img className="single-object-img" src={object.primaryImageSmall || object.primaryimageurl}/> : <Error msg="No image data"/>}
                <p className="data-from"> Data From: { collectionId === 1 ? "Metropolitan Museum of Arts" : "Harvard Arts Museum"} </p> 
                { isAdded ? <p className="added-to-exhibition"> Already in your Exhibition </p> : <div className="container-button-add"><button onClick = {() => { handleAddToExhibition() }}>  Add to My Exhibition </button></div> }
            </ul>
        </div>
    )
}