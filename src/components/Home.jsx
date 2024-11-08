import '../styles/App.css'

export default function Home () {
    return (
    <div className = "home">
        <summary className="single-text-center">
            <p> Welcome to Exhibition Curator ! </p>
        </summary>
        <div className="introduction">
            <h2> Don't know where to start ? </h2>
            <p> Start by clicking on the '<u>View Collections</u>' tab to browse the various collections</p>
            <p> Filter/Search/Sort through the collections to find your perfect piece of art</p>
            <p> '<u>View More</u>' info about a specific artwork and choose whether to add it to your own personal exhibition </p>
            <p> Keep track of all your artworks via the '<u>My Exhibition</u>' tab </p>
        </div>
    </div>
    )
}