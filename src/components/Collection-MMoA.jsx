import { useEffect, useState } from 'react'
import { getAllMetropolitanObjects } from '../api'
import ObjectCard from './ObjectCard'

import '../styles/Collection-MMoA.css'

export default function CollectionMMoA () {
    const [objectIDs, setObjectIDs] = useState([])

    useEffect(() => {
        getAllMetropolitanObjects()
        .then(response => {
            const objectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(objectIDs)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="collection-mmoa">
            {objectIDs.map(objectID => {
                return <ObjectCard key={objectID} id={objectID}/>
            })}
        </div>
    )
}