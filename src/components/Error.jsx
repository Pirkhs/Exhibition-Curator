import '../styles/Error.css'

export default function Error ({msg}) {
    return <div className="error">
        <p> ⚠️ {msg} </p>
    </div>
}