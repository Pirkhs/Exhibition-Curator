import '../styles/Collections.css'
import CollectionHAM from './Collection-HAM'
import CollectionMMoA from './Collection-MMoA'

export default function Collections () {
    return (
        <>
        <section>
            <h2 className="collection-header"> Metropolitan Museum of Art Collection</h2>
            <CollectionMMoA/>
        </section>
        <div className = "container-divider"></div>
        <section>
            <h2 className="collection-header"> Harvard Arts Museum Collection </h2>
            <CollectionHAM/>
        </section>
        </>
    )
}