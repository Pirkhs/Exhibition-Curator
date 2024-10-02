import { useEffect, useState } from 'react'

import '../styles/Exhibition.css'
import ObjectCardHAM from './ObjectCard-HAM'

export default function Exhibition () {
    const [exhibition, setExhibition] = useState([])

    useEffect(() => {
        const myExhibition = JSON.parse(localStorage.getItem("Exhibition")) || []
        setExhibition(myExhibition)
    }, [])

    return exhibition.length === 0 ? <p> Start by adding some objects to your collection!</p>
    : (
        <>
        <div className="exhibition">
            { exhibition.map(object => {
                return <ObjectCardHAM key={object.objectid} object={object}/>
            }) }
        </div>
        <p> Warning! Exhibition is lost when your session has ended </p>
        </>
    )
}