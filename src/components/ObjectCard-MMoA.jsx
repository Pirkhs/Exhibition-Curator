import { useEffect, useState } from 'react'

import Error from './Error.jsx'

import { getMetropolitanObjectById } from '../api'
import '../styles/ObjectCard.css'

export default function ObjectCardMMoA ({id}) {
    const [object, setObject] = useState({})

    useEffect(() => {
        getMetropolitanObjectById(id)
        .then(response => {
            setObject(response.data)
        })
    }, [])

    return (
        <div className="object-card">
            { object.title ? <p> {object.title} </p> : <Error msg="No Title Data"/>}
            { object.primaryImageSmall ? <img src={object.primaryImageSmall}/> : <Error msg="No Image Data"/>}
            <p> <span className='object-id'> Id No. </span> {id} </p>
        </div>
    )
}