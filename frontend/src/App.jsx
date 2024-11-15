import { useState } from 'react'

import './App.css'
import Add from './components/Add'
import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav /><br /><br />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
        </Route>
      </Routes>
    </>
  )
}

export default App