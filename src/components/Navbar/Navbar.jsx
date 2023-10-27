import React from 'react'
import { Link } from 'react-router-dom'
import MenuToggler from '../MenuToggler/MenuToggler'
import { useSelector, useDispatch } from 'react-redux';
import { openMenu, closeMenu } from '../../store/slices/sideMenuSlice'
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.sideMenu)
 
  const activeMenuClassName = 'navbar_state_active';
  function handleToggleMenu() {
    if (isMenuOpen) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  }
  return (
    <div className='menu'>
      <ul className={`navbar ${isMenuOpen ? activeMenuClassName : ''}`}>
        <li className='navbar__item'><Link to='/projects' className='navbar__link'>Projects list</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>Project tasks</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>Contact me</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>My github</Link></li>
      </ul>
      <MenuToggler onClick={handleToggleMenu} isMenuOpen={isMenuOpen}/>
    </div>
  )
}

export default Navbar
