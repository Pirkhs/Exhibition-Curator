
import Error from './Error.jsx'

import '../styles/ObjectCard.css'

export default function ObjectCardHAM ({object}) {
    return (
        <div className="object-card">
            { object.title ? <p> {object.title} </p> : <Error msg="No Title Data"/>}
            { object.primaryimageurl ? <img src={object.primaryimageurl}/> : <Error msg="No Image Data"/>}
            <p> <span className='object-id'> Id No. </span> {object.objectid} </p>
        </div>
    )
}