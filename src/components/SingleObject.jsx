import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { getHarvardObjectById, getMetropolitanObjectById } from "../api"

import Error from "./Error"
import Loading from "./Loading"
import ImageComponent from "./Image"

import '../styles/SingleObject.css'


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
        .then(response => {
            collectionId === 1 ? setObject(response.data) : setObject(response.data.records[0])
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")

    })

    }, [])

    const checkIsAlreadyInExhibition = () => {
        const objectsInExhibition = JSON.parse(localStorage.getItem("Exhibition")) || []
        if (objectsInExhibition.length === 0) return
        
        const IdsInExhibition = objectsInExhibition.map(object => `${object.collectionId}/${object.objectId}`)
        setIsAdded(IdsInExhibition.includes(`${collectionId}/${objectId}`))
    }
    
    if (isError) return <Error msg={isError}/>

    return isLoading ? <Loading msg="Loading Single Object..."/> : (
        <section className="single-object">
            { JSON.stringify(object) === "{}" || object === undefined ? <p> Object could not be found </p> : 
            <ul>
                <h2 id="single-object-title"> {object.title || <Error msg="No title data"/>} </h2>
                <li id="object-id"> Id: {objectId} </li>

                <table className="object-data">
                    <thead>
                    <tr>
                        <td> Key </td>
                        <td> Value </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td> Classification </td>
                        <td> {object.classification || "⚠️ No classification data"} </td>
                    </tr>
                    <tr className="row-darker">
                        <td> Accession Year </td>
                        <td> {object.accessionYear || object.accessionyear || " ⚠️ No accession year data"} </td>
                    </tr>
                    <tr>
                        <td> Department </td>
                        <td> {object.department || " ⚠️ No department data"} </td>
                    </tr>
                    <tr className="row-darker">
                        <td> Credit Line </td>
                        <td> {object.creditLine || object.creditline|| " ⚠️ No credit line data"} </td>
                    </tr>
                    <tr>
                        <td> Culture </td>
                        <td> {object.culture || " ⚠️ No culture data"} </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div className="container-single-image">
                    { object.primaryImageSmall || object.primaryimageurl ? <ImageComponent src={object.primaryImageSmall || object.primaryimageurl} alt={`An image of ${object.title}`}/> : <Error msg="No image data"/>}
                </div>
                <br/>
                <figcaption className="data-from"> Data From: <span className="collection-name">{ collectionId === 1 ? "Metropolitan Museum of Arts" : "Harvard Arts Museum"} </span> </figcaption> 
                <br/>
                <div className="container-button-add">
                {
                    !isAdded ? <button onClick = {() => { handleAddToExhibition() }}> Add to My Exhibition </button> : <p> Already in Your Exhibition </p>
                }
                </div> 
            </ul>
            }
        </section>
    )
}