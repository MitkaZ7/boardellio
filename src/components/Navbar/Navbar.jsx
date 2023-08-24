import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <ul className='navbar'>
      <li className='navbar__item'><Link to='/projects' className='navbar__link'>projects</Link></li>
      <li className='navbar__item'><Link to='tasks' className='navbar__link'>tasks</Link></li>
    </ul>
  )
}

export default Navbar
