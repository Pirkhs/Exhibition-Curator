import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Error from './Error.jsx'

import { getMetropolitanObjectById } from '../api'
import '../styles/ObjectCard.css'
import Loading from './Loading.jsx'

export default function ObjectCardMMoA ({id}) {
    const [object, setObject] = useState({})
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getMetropolitanObjectById(id)
        .then(response => {
            setObject(response.data)
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false))
    }, [])

    { if (isError) {
        return <Error msg="Data Fetch Unsuccessful, Please Try Again"/>
    }}

    return isLoading ? <Loading msg="Loading Object Card..."/> : (
        <div className="object-card">
            { object.title ? <p> {object.title} </p> : <Error msg="No Title Data"/>}
            { object.primaryImageSmall ? <img src={object.primaryImageSmall}/> : <Error msg="No Image Data"/>}
            <p> <span className='object-id'> Id No. </span> {id} </p>
            <Link to={`/collections/1/${id}`}> <button> View More </button> </Link>
        </div>
    )
}