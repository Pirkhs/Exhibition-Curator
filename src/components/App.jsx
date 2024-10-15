import '../styles/App.css'
import Collections from './Collections'
import Error from './Error'
import Exhibition from './Exhibition'
import Header from './Header'
import Home from './Home'
import Nav from './Nav'
import { Routes, Route } from 'react-router-dom'
import SingleObject from './SingleObject'

function App() {

  return (
    <>
      <div className="sticky-nav">
        <Header/>
        <Nav/>
      </div>
      <main>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/collections" element={<Collections/>}></Route>
        <Route path="/collections/:collection_id/:object_id" element={<SingleObject/>}></Route>
        <Route path="/exhibition" element={<Exhibition/>}></Route>
        <Route path="*" element={<Error msg={'404: Page not found'}/>} />
      </Routes>
      </main>
    </>
  )
}

export default App
