import { useEffect, useState } from 'react'
import { getAllHarvardClassifications, getAllHarvardObjects, getHarvardObjectsByClassification, getHarvardObjectsByPage, getHarvardObjectsBySearchTerm, getSortedHarvardObjects } from '../api'

import '../styles/Collections.css'
import Loading from './Loading'
import ObjectCard from './ObjectCard'
import Error from './Error'

export default function CollectionHAM () {
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [objects, setObjects] = useState([])
    const [classifications, setClassifications] = useState([])
    const [classificationFilter, setClassificationFilter] = useState(null)
    const [info, setInfo] = useState([])
    const [searchTerm, setSearchTerm] = useState(null)
    const [pageExists, setPageExists] = useState(true)
    const [sortQuery, setSortQuery] = useState("")

    const sortQueries = [
        "Accession Year | Ascending",
        "Accession Year | Descending",
        "Rank | Ascending",
        "Rank | Descending",
        "Total Page Views | Ascending",
        "Total Page Views | Descending",
        "Date of First Page View | Ascending",
        "Date of First Page View | Descending",
    ]

    const handleSort = (e) => {
        const sortQuery = e.target.value
        const [sortStr, sortOrderStr] = sortQuery.split("|")
        const sort = sortStr.toLowerCase().replace(/ /g, "")
        const sortOrder = sortOrderStr.toLowerCase().replace(/ending/, "").trim()
        setClassificationFilter("")
        setSortQuery(sortQuery)
        setIsLoading("Sorting Collection...")
        getSortedHarvardObjects(sort, sortOrder)
        .then(response => {
            setObjects(response.data.records)
            setInfo(response.data.info)
            setIsLoading("")
        })
        .catch(err => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }

    const handlePageNav = (url) => {
        if (!url) {
            setPageExists(false)
            return
        }
        setPageExists(true)
        setIsLoading("Loading Page...")
        getHarvardObjectsByPage(url.slice(33))
        .then(response => {
            setObjects(response.data.records)
            setInfo(response.data.info)
            setIsLoading("")
        })
        .catch(err => {
            setIsError(err)
            setIsLoading("")
        })
    }

    useEffect(() => {
        setIsLoading("Loading classifications...")
        getAllHarvardClassifications()
        .then(response => {
            const classifications = response.data.records
            setClassifications(classifications.map((classification) => classification.name)) 
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [])

    useEffect(() => {
        if (!classificationFilter) return
        setSortQuery("")
        setIsLoading("Filtering Collection...")
        setPageExists(true)
        getHarvardObjectsByClassification(classificationFilter)
        .then(response => {
            setObjects(response.data.records)
            setInfo(response.data.info)
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
            
    }, [classificationFilter])

    useEffect(() => {
        setIsLoading("Loading Collection...")
        getAllHarvardObjects()
        .then(response => {
            const {info, records} = response.data
            setInfo(info)
            setObjects(...[records])
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        setIsLoading("Searching Collection...")
        setPageExists(true)
        setClassificationFilter("")
        setSortQuery("")
        getHarvardObjectsBySearchTerm(searchTerm)
        .then(response => {
            setObjects(response.data.records)
            setInfo(response.data.info)
            setIsLoading("")
        })
        .catch((err) => {
            setIsError(`${err}`)
            setIsLoading("")
        })
    }, [searchTerm])

    if (isError) return <Error msg={isError}/>
    return ( isLoading ? <div className='container-loading'><Loading msg={isLoading}/> </div> : 
        <>
        <form onSubmit={(e) => {e.preventDefault(); setSearchTerm(e.target["query"].value) }} className="container-searchbar"> 
            Search for: <input placeholder=" e.g. sunflowers" type="search" name="query" /> 
            <button type="submit">Search</button>
        </form>
        <br/>
        <div className="container-queries">
            <select name="filters" id="filters" onChange={(e) => setClassificationFilter(e.target.value)}>  
                    <option hidden> Filter </option>
                { 
                    classifications.map(classification => {
                        return <option key={classification}>{classification}</option>
                    })
                }
            </select>
            <br/>
            <select name="sort" id="sort" onChange={(e) => handleSort(e)}>  
                    <option hidden> Sort </option>
                { 
                    sortQueries.map(query => {
                        return <option key={query}>{query}</option>
                    })
                }
            </select>

        </div>
            { 
                classificationFilter ? <p><span id="filter-text"> Current Filter: </span> <br/> {classificationFilter} </p> : <></>
            } 
            { 
                sortQuery ? <p><span id="sort-text"> Current Sort: </span> <br/> {sortQuery} </p> : <></>
            }  
        <br/>
        <div className="container-collection">
            <br></br>
            { objects.length === 0 || objects === null ? <p className="collection"> No objects to show </p> :
            <section className="collection" id="collection">
                { objects.map(object => {
                    return <ObjectCard key = {object.objectid} objectData={object} collectionId={2}/>
                })}
            </section>
            }
        </div>
        <br></br>
        <div className="container-page-nav">
            <div className="page-nav">
            <button onClick={() => {handlePageNav(info.prev)}}> Prev </button>
            <p> Page {info.page} </p>
            <button onClick={() => handlePageNav(info.next)}> Next </button>
            </div>
        </div>
            { pageExists ? <></> : <p id="page-nav-error"> ⚠️ Page does not exist </p> }
        </>
    )
}