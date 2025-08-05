import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Timer from './components/Timer';
import Counter from './components/Counter'
import './App.css'

function App() {

  return (
    <Router>
      <nav>
        <Link to="/">Counter</Link> | <Link to="/timer">Timer</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Counter />} />
        <Route path='/timer' element={<Timer />} />
      </Routes>
    </Router>
  )
}

export default App
