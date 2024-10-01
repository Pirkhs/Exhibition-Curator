import { useEffect, useState } from 'react'
import { getAllMetropolitanObjects, getMetropolitanObjectById, getMetropolitanObjectsByDepartment } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCardMMoA from './ObjectCard-MMoA'

export default function CollectionMMoA () {
    const [isError, setIsError] = useState(false)
    const [objectIDs, setObjectIDs] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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

    const handleButtonFilter = (e) => {
        const departmentId = objectDepartments[e.target.innerHTML]
        setIsLoading(true)
        getMetropolitanObjectsByDepartment(departmentId)
        .then(response => {
            const objectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(objectIDs)
        })
        .catch(() => setIsError(true))
        .finally(setIsLoading(false))
        
    }

    useEffect(() => {
        setIsLoading(true)
        getAllMetropolitanObjects()
        .then(response => {
            const objectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(objectIDs)
            
        })
        .catch(err => setIsError(true))
        .finally(() => setIsLoading(false))
    }, [])

    { if (isError) {
        return <Error msg="Data Fetch Unsuccessful, Please Try Again"/>
    }}

    return isLoading ? <Loading msg="Loading Metropolitan Collection"/> :(
        <section>
            <div className="collection">
                {objectIDs.map(objectID => {
                    return <ObjectCardMMoA key={objectID} id={objectID}/>
                })}
            </div>
            <div className="filter">
                <h3> Filter By Department</h3>
                <div className="filter-buttons">
                    { Object.keys(objectDepartments).map(department => {
                        return <button key = {department} onClick={(e) => handleButtonFilter(e)}>{department}</button>
                    })}
                </div>
            </div>
        </section>
    )
}