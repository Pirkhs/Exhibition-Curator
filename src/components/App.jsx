import '../styles/App.css'
import Collections from './Collections'
import Error from './Error'
import Exhibition from './Exhibition'
import Header from './Header'
import Home from './Home'
import Nav from './Nav'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Header/>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/collections" element={<Collections/>}></Route>
        <Route path="/exhibition" element={<Exhibition/>}></Route>
        <Route path="*" element={<Error msg={'404: Page not found'}/>} />
      </Routes>
    </>
  )
}

export default App
