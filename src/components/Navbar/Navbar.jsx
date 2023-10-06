import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <ul className='navbar'>
      <li className='navbar__item'><Link to='/projects' className='navbar__link'>All projects</Link></li>
      <li className='navbar__item'><Link to='tasks' className='navbar__link'>Project tasks</Link></li>
      <li className='navbar__item'><Link to='tasks' className='navbar__link'>Contact me</Link></li>
      <li className='navbar__item'><Link to='tasks' className='navbar__link'>My github</Link></li>
    </ul>
  )
}

export default Navbar
