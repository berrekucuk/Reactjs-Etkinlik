import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ActivityMain from './pages/admin/activity'
import CategoryMain from './pages/admin/category'
import Login from './pages/auth/Login'
import AdminHeader from './components/layout/admin/AdminHeader'
import { Container } from '@mui/material'

function App() {
  return <>
    <AdminHeader />
    <Container style={{marginTop: 50}}>
      <Routes>
        <Route path="/admin/activity/*" element={<ActivityMain />} />
        <Route path="/admin/category/*" element={<CategoryMain />} />
        {/* <Route path="/login" element={<Login/>} /> */}
      </Routes>
    </Container>

  </>
}

export default App
