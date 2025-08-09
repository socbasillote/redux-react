import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './features/auth/Register'
import Login from './features/auth/Login'
import Home from './pages/Home'
import Todos from './features/todos/Todos'
import './App.css'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App
