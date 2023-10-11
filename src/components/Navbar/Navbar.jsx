import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import MenuToggler from '../MenuToggler/MenuToggler'
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const activeMenuClassName = 'navbar_state_active';
  function handleOpenMenu() {
    setMenuOpen(!isMenuOpen);
  }
  return (
    <div className='menu'>
      <ul className={`navbar ${isMenuOpen ? activeMenuClassName : ''}`}>
        <li className='navbar__item'><Link to='/projects' className='navbar__link'>Projects list</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>Project tasks</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>Contact me</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>My github</Link></li>
      </ul>
      <MenuToggler onClick={handleOpenMenu} isMenuOpen={isMenuOpen}/>
    </div>
  )
}

export default Navbar
