import '../styles/Collections.css'
import CollectionHAM from './Collection-HAM'
import CollectionMMoA from './Collection-MMoA'

export default function Collections () {
    return (
        <>
        <section>
            <h2> Metropolitan Museum of Art </h2>
            <CollectionMMoA/>
        </section>

        <section>
            <h2> Harvard Arts Museum </h2>
            <CollectionHAM/>
        </section>
        </>
    )
}