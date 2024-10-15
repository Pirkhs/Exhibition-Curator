import { useEffect, useState } from 'react'
import { getAllMetropolitanObjects, getMetropolitanObjectById, getMetropolitanObjectBySearchTerm, getMetropolitanObjectsByDepartment } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCard from './ObjectCard'
import Error from './Error'

export default function CollectionMMoA () {
    const [isError, setIsError] = useState(false)
    const [objectIDs, setObjectIDs] = useState([])
    const [isLoading, setIsLoading] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)

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
        if (!searchTerm) return
        setIsLoading("Searching Collection...")
        getMetropolitanObjectBySearchTerm(searchTerm)
        .then(response => {
            if (response.data.objectIDs === null) { 
                setIsLoading("")
                setObjectIDs([])
                return
            }
            const searchedObjectIDs = response.data.objectIDs.slice(0, 20)
            setObjectIDs(searchedObjectIDs)
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [searchTerm])

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

    return isLoading ? <div className="container-loading"><Loading msg={isLoading}/></div> :(
        <>
        <form className="searchbar" onSubmit={(e) => { e.preventDefault(); setSearchTerm(e.target["query"].value)}}> 
            Search for: <input placeholder=" e.g. sunflowers" type="search" name="query"/>
            <button type="submit">Search</button>
        </form>
        <br></br>
        <div className="container-collection">
            { objectIDs.length === 0 || objectIDs === null ? <p className="collection"> No objects to show </p> :
            <section className="collection">
                {objectIDs.map(objectID => {
                    return <ObjectCard key={objectID} objectId={objectID} collectionId={1}/>
                })}
            </section>
            }
            <aside className="filter">
                <h3> Filter By Department</h3>
                <div className="filter-buttons">
                    { Object.keys(objectDepartments).map(department => {
                        return <button key = {department} onClick={() => setDepartmentFilter(department)}>{department}</button>
                    })}
                </div>
            </aside>
        </div>
        </>
    )
}