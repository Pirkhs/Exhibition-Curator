import '../styles/Collections.css'
import CollectionMMoA from './Collection-MMoA'

export default function Collections () {
    return (
        <div className="collections">
            <h2> Metropolitan Museum of Art Collection </h2>
            <form className="searchbar MMoA"> 
                Search for: <input name="query MMoA" /> 
                <button type="submit">Search</button>
            </form>
            <br></br>
            <CollectionMMoA/>
        </div>
    )
}