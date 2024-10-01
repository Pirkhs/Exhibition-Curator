import { Link } from 'react-router-dom'
import '../styles/Nav.css'

export default function Nav () {
    return (
        <>
        <nav>
            <Link to="/"> Home </Link> |
            <Link to="/collections"> View Collections </Link> |
            <Link to="/exhibition"> My Exhibition </Link>
        </nav>
        <br></br>
        </>
    )
}