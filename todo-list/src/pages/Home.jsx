import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Home() {
    const currentUser = useSelector(state => state.auth.currentUser);
    
  return currentUser ? <Navigate to="/todos" /> : <Navigate to="/login" />;
}

export default Home