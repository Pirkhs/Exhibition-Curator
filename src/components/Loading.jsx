import '../styles/Loading.css'

export default function Loading ({msg}) {
    return (
        <>
            <span className="loader"></span> 
            <br/>
            <i> <p> {msg} </p> </i>
        </>
    )
}