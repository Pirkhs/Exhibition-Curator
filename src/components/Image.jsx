import { useState, useEffect } from "react"

import '../styles/Image.css'
import Loading from "./Loading"

export default function ImageComponent ({ src, alt }) {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        if (!src) return
        const img = new Image()
        img.onload = () => {setImageLoaded(true)}
        img.src = src
    }, [src])
    
    return (
    <>
        <div style = {{display: imageLoaded ? 'none' : 'inline' }}>
            <Loading msg = "Loading Image..."/>
        </div>
        <div style = {{display: !imageLoaded ? 'none' : 'inline' }}>
        <img
            className="img-centered"
            src = {src}
            alt = {alt}
            loading = "lazy"
        />
        </div>
    </>
    )
}