import { useEffect, useState } from 'react'

import '../styles/Exhibition.css'
import ObjectCard from './ObjectCard'

export default function Exhibition () {
    const [exhibition, setExhibition] = useState([])

    useEffect(() => {
        const myExhibition = JSON.parse(localStorage.getItem("Exhibition")) || []
        setExhibition(myExhibition)
    
    }, [])

    return exhibition.length === 0 ? <p> Start by adding some objects to your collection!</p>
    : (
        <>
        <h2> My Collection </h2>
        <div className="exhibition">
            { exhibition.map(object => {
                return <ObjectCard key={object.objectId} objectId={object.objectId} objectData={object} collectionId={object.collectionId}/>
            }) }
        </div>
        <p> Warning! Exhibition is lost when your session has ended </p>
        </>
    )
}