import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Pages/Home'
import {Interview} from "../Components/Interview"
import { InterviewTypes } from '../Components/InterviewTypes'
import { About } from '../Pages/About'
import { Contact } from '../Pages/Contact'

export const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/interviews' element={<InterviewTypes/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/interview/mern' element={<Interview/>}/>
            <Route path='/interview/java' element={<Interview/>}/>
            <Route path='/interview/node' element={<Interview/>}/>
        </Routes>
    </div>
  )
}
