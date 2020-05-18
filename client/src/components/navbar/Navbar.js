import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <header className="navbar">
        <div>
          <NavLink to='/'>FlashMe</NavLink>
        </div>
        <nav>
          <ul>
            <li className="links">
              <NavLink to='register'>Register</NavLink>
            </li>
            <li>
              <NavLink to='login'>Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
