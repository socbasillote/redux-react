import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/todos">Todos</Link>
        </nav>
    </div>
  )
}

export default Header