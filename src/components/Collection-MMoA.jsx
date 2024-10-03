import { useEffect, useState } from 'react'
import { getAllMetropolitanObjects, getMetropolitanObjectById, getMetropolitanObjectsByDepartment } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCard from './ObjectCard'
import Error from './Error'

export default function CollectionMMoA () {
    const [isError, setIsError] = useState(false)
    const [objectIDs, setObjectIDs] = useState([])
    const [isLoading, setIsLoading] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState(null)

    const objectDepartments = {
        "American Decorative Arts": 1,
        "Ancient Near Eastern Art": 3,
        "Arts of Africa, Oceania, and the Americas": 5,
        "Asian Art": 6,
        "Egyptian Art": 10,
        "Greek and Roman Art": 13,
        "Islamic Art": 14,
        "Medieval Art": 17,
        "Modern Art": 21
    }

    useEffect(() => {
        if (!departmentFilter) return
        setIsLoading("Filtering Collection...")
        const departmentId = objectDepartments[departmentFilter]
        getMetropolitanObjectsByDepartment(departmentId)
        .then(response => {
            const filteredObjectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(filteredObjectIDs  )
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [departmentFilter])

    useEffect(() => {
        setIsLoading("Loading Collection...")
        getAllMetropolitanObjects()
        .then(response => {
            const objectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(objectIDs)
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [])

    if (isError) return <Error msg={isError}/>

    return isLoading ? <Loading msg={isLoading}/> :(
        <section>
            { objectIDs.length === 0 ? <p className="collection"> No objects to show </p> :
            <div className="collection">
                {objectIDs.map(objectID => {
                    return <ObjectCard key={objectID} objectId={objectID} collectionId={1}/>
                })}
            </div>
            }
            <div className="filter">
                <h3> Filter By Department</h3>
                <div className="filter-buttons">
                    { Object.keys(objectDepartments).map(department => {
                        return <button key = {department} onClick={() => setDepartmentFilter(department)}>{department}</button>
                    })}
                </div>
            </div>
        </section>
    )
}