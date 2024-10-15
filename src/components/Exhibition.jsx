import { useEffect, useState } from 'react'

import '../styles/App.css'
import '../styles/Exhibition.css'

import ObjectCard from './ObjectCard'

export default function Exhibition () {
    const [exhibition, setExhibition] = useState([])

    useEffect(() => {
        const myExhibition = JSON.parse(localStorage.getItem("Exhibition")) || []
        setExhibition(myExhibition)
    
    }, [])

    return exhibition.length === 0 ? <div className="single-text-center"> <p> Start by adding some objects to your exhibition!</p> </div>
    : (
        <>
            <summary className="single-text-center"> <p> Warning! Exhibition is lost when your session has ended </p> </summary>
        <h2> My Exhibition </h2>
        <div className="exhibition">
            { exhibition.map(object => {
                return <ObjectCard key={object.objectId} objectId={object.objectId} objectData={object} collectionId={object.collectionId} inExhibition={true}/>
            }) }
        </div>
        </>
    )
}