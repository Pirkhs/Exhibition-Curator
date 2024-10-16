import { useEffect, useState } from 'react'
import getMetropolitanObjectsByPage, { getAllMetropolitanObjects, getMetropolitanObjectBySearchTerm, getMetropolitanObjectsByDepartment } from '../api'

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
    const [pageNo, setPageNo] = useState(1)
    const [pageExists, setPageExists] = useState(true)
    const [responseURL, setReponseURL] = useState("")

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

    const handlePageNav = (newPageNumber) => {
        if (newPageNumber === 0) {
            setPageExists(false)
            return
        }
        setPageExists(true)
        setPageNo(newPageNumber)
        setIsLoading("Loading New Page...")
        const endpoint = responseURL.split("/").splice(6).join("/")
        getMetropolitanObjectsByPage(endpoint)
        .then(response => {
            setReponseURL(response.request.responseURL)
            setObjectIDs(response.data.objectIDs.slice((newPageNumber - 1) * 20, newPageNumber * 20))
            setIsLoading("")
        })
        .catch(err => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }

    useEffect(() => {
        if (!searchTerm) return
        setIsLoading("Searching Collection...")
        setPageNo(1)
        getMetropolitanObjectBySearchTerm(searchTerm)
        .then(response => {
            if (response.data.objectIDs === null) { 
                setIsLoading("")
                setObjectIDs([])
                return
            }
            const searchedObjectIDs = response.data.objectIDs.slice(0, 20)
            setReponseURL(response.request.responseURL)
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
        setPageNo(1)
        const departmentId = objectDepartments[departmentFilter]
        getMetropolitanObjectsByDepartment(departmentId)
        .then(response => {
            setReponseURL(response.request.responseURL)
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
            setReponseURL(response.request.responseURL)
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
        <br></br>
        <div className="container-page-nav">
            <button onClick={() => {handlePageNav(pageNo - 1)}}> Prev </button>
            <p> Page {pageNo} </p>
            <button onClick={() => handlePageNav(pageNo + 1)}> Next </button>
        </div>
        { pageExists ? <></> : <p> Page does not exist </p> }
        </>
    )
}