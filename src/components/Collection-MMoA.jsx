import { useEffect, useState } from 'react'
import { getAllMetropolitanObjects, getMetropolitanObjectById, getMetropolitanObjectsByDepartment } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCard from './ObjectCard'
import Error from './Error'

export default function CollectionMMoA () {
    const [isError, setIsError] = useState(false)
    const [objectIDs, setObjectIDs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        if (departmentFilter) {
            const departmentId = objectDepartments[departmentFilter]
            getMetropolitanObjectsByDepartment(departmentId)
            .then(response => {
                const objectIDs = response.data.objectIDs.slice(0, 20)
                setObjectIDs(objectIDs)
            })
            .catch(() => setIsError("Unable to fetch objects"))
            .finally(setIsLoading(false))
            return
        }

        getAllMetropolitanObjects()
        .then(response => {
            const objectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(objectIDs)
            
        })
        .catch(() => setIsError("Unable to fetch collection"))
        .finally(() => setIsLoading(false))

    }, [departmentFilter])

    if (isError) return <Error msg={isError}/>

    return isLoading ? <Loading msg="Loading Metropolitan Collection"/> :(
        <section>
            <div className="collection">
                {objectIDs.map(objectID => {
                    return <ObjectCard key={objectID} objectId={objectID} collectionId={1}/>
                })}
            </div>
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