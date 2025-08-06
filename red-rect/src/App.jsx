import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Timer from './components/Timer';
import Counter from './components/Counter';
import SettingsModal from './components/SettingsModal';
import './App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Router>
      <nav>
        <Link to="/">Counter</Link> | <Link to="/timer">Timer</Link>
        <div>
          <button onClick={() => setShowSettings(true)}>Settings</button>
          {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Counter />} />
        <Route path='/timer' element={<Timer />} />
      </Routes>
    </Router>
  )
}

export default App
