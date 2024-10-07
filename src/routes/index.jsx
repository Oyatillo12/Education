import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { School, SinglePage } from '../pages'

function SchoolRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<School/>}/>
        <Route path='person/:id' element={<SinglePage/>}/>
      </Routes>
    </div>
  )
}

export default SchoolRoutes
