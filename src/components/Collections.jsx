import '../styles/Collections.css'
import CollectionHAM from './Collection-HAM'
import CollectionMMoA from './Collection-MMoA'

export default function Collections () {
    return (
        <>
        <div className="collections">
            <h2> Metropolitan Museum of Art </h2>
            <form className="searchbar MMoA"> 
                Search for: <input name="query MMoA" /> 
                <button type="submit">Search</button>
            </form>
            <br></br>
            <CollectionMMoA/>
        </div>

        <div className="collections">
            <h2> Harvard Arts Museum </h2>
            <form className="searchbar HAM"> 
                Search for: <input name="query HAM" /> 
                <button type="submit">Search</button>
            </form>
            <br></br>
            <CollectionHAM/>
        </div>
        </>
    )
}