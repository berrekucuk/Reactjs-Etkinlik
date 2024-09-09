import React from 'react'
import { Route, Routes } from 'react-router-dom'
import List from "./List"
import Add from "./Add"
import Update from "./Update"

function ActivityMain() {
  return <>
    <Routes>
        <Route path="/" element={<List/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/update/:id' element={<Update/>}/>
    </Routes>
  </>
}

export default ActivityMain