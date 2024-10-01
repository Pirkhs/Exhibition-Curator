import { useParams} from "react-router-dom"

export default function SingleObject ({object}) {
    const {collection_id, object_id} = useParams()
  
    return (
        <>
            <p> Single Object {object_id} {collection_id} </p>
        </>
    )
}