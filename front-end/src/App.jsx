import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Inventory from './pages/Inventory'
import CreateDuck from './pages/CreateDuck'
import EditDuck from './pages/EditDuck'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Inventory/>} />
      <Route path='/ducks/create' element={<CreateDuck/>} />
      <Route path='/ducks/edit/:id' element={<EditDuck/>} />
    </Routes>
  )
}

export default App