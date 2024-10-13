import '../styles/Collections.css'
import CollectionHAM from './Collection-HAM'
import CollectionMMoA from './Collection-MMoA'

export default function Collections () {
    return (
        <>
        <div className="collections">
            <h2> Metropolitan Museum of Art </h2>
            <CollectionMMoA/>
        </div>

        <div className="collections">
            <h2> Harvard Arts Museum </h2>
            <CollectionHAM/>
        </div>
        </>
    )
}