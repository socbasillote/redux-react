import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'

import Counter from './features/counter/Counter'
import Leaderboard from './features/leaderbaord/Leaderboard'

import './App.css'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
