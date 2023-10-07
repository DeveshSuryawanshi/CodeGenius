import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Pages/Home'
import {Interview} from "../Components/Interview"

export const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/interview' element={<Interview/>}/>
        </Routes>
    </div>
  )
}
