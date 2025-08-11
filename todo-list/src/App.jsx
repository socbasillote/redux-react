import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './features/auth/Register'
import Login from './features/auth/Login'
import Home from './pages/Home'
import Todos from './features/todos/Todos'
import './App.css'
import { useSelector } from 'react-redux'
import Header from './components/Header'

// ProtectedRoute - only for logged-in users
function ProtectedRoute({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  if (!currentUser) {
    return <Navigate to='/login' replace />;
  }
  return children
}

// GuestRoute - only for guests (not logged in)
function GuestRoute({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  if (currentUser) {
    return <Navigate to="/todos" replace />;
  }
  return children;
}

function App() {

  return (
    <div>
      
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
          <Route path='/login' element={<GuestRoute><Login /> </GuestRoute>} />
          <Route 
            path='/todos' 
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
