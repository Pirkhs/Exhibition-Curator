import { useEffect, useState } from 'react'
import { getMetropolitanObjectsByUrl, getAllMetropolitanObjects, getMetropolitanObjectBySearchTerm, getMetropolitanObjectsByDepartment, getMetropolitanDepartments } from '../api'

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
    const [departments, setDepartments] = useState([])
    const [departmentsLoaded, setDepartmentsLoaded] = useState(false)
    const [quantity, setQuantity] = useState(20)

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
        setIsLoading("Updating Quantity...")
        getMetropolitanObjectsByUrl(responseURL)
        .then(response => {
            setReponseURL(response.request.responseURL)
            setObjectIDs(response.data.objectIDs.slice(0, e.target.value))
            setIsLoading("")
        })
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
        getMetropolitanObjectsByUrl(endpoint)
        .then(response => {
            setReponseURL(response.request.responseURL)
            setObjectIDs(response.data.objectIDs.slice((newPageNumber - 1) * quantity, newPageNumber * quantity))
            setIsLoading("")
        })
        .catch(err => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }

    useEffect(() => {
        setDepartmentsLoaded(true)
        getMetropolitanDepartments()
        .then(response => {
            setDepartments(response.data.departments)
            setDepartmentsLoaded(true)
        })
        .catch(err => {
            setIsError(`${err}`)
            setDepartmentsLoaded(true)
        })
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        setIsLoading("Searching Collection...")
        setPageNo(1)
        setDepartmentFilter("")
        getMetropolitanObjectBySearchTerm(searchTerm)
        .then(response => {
            if (response.data.objectIDs === null) { 
                setIsLoading("")
                setObjectIDs([])
                return
            }
            const searchedObjectIDs = response.data.objectIDs.slice(0, quantity)
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
        const {departmentId} = departmentFilter
        setIsLoading("Filtering Collection...")
        setPageNo(1)
        getMetropolitanObjectsByDepartment(departmentId)
        .then(response => {
            setReponseURL(response.request.responseURL)
            const filteredObjectIDs = response.data.objectIDs.slice(0, quantity)
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
            const objectIDs = response.data.objectIDs.slice(0, quantity)
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
        <form className="container-searchbar" onSubmit={(e) => { e.preventDefault(); setSearchTerm(e.target["query"].value)}}> 
            Search for: <input placeholder=" e.g. sunflowers" type="search" name="query"/>
            <button type="submit">Search</button>
        </form>
        <br/>
        <div className="container-queries">
            <select name="filters" id="filters" onChange={(e) => setDepartmentFilter({departmentId: e.target.options[e.target.selectedIndex].getAttribute("id"), displayName: e.target.value})}>  
                    <option hidden> Filter </option>
                { 
                    departments.map(department => {
                        return <option id={department.departmentId} key={department.departmentId}>{department.displayName}</option>
                    })
                }
            </select>
            <select onChange={(e) => handleQuantity(e)}>
                <option hidden> Quantity </option>
                <option value="20"> 20 </option>
                <option value="30"> 30 </option>
                <option value="40"> 40 </option>
                <option value="50"> 50 </option>
            </select>
        </div>
                { 
                    departmentFilter ? <p><span id="filter-text"> Current Filter: </span> <br/> {departmentFilter.displayName} </p> : <></>
                } 
                { 
                    quantity ? <p><span id="quantity-text"> Quantity: </span> <br/> {quantity} </p> : <></>
                }  
        <br/>
        <div className="container-collection">
            { objectIDs.length === 0 || objectIDs === null ? <p className="collection"> No objects to show </p> :
            <section className="collection">
                {objectIDs.map(objectID => {
                    return <ObjectCard key={objectID} objectId={objectID} collectionId={1}/>
                })}
            </section>
            }
        </div>
        <br></br>
        <div className="container-page-nav">
            <div className="page-nav"> 
            <button onClick={() => {handlePageNav(pageNo - 1)}}> Prev </button>
            <p> Page {pageNo} </p>
            <button onClick={() => handlePageNav(pageNo + 1)}> Next </button>
            </div>
        </div>
        { pageExists ? <></> : <p id="page-nav-error"> ⚠️ Page does not exist </p> }
        </>
    )
}