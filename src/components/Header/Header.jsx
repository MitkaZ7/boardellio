import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import Navbar from '../Navbar/Navbar'
import MenuToggler from '../MenuToggler/MenuToggler'
const Header = () => {
  return (
    <header className='header'>
        <img src={logo} className='header__logo'></img>
      <Link to='/'>
        <h3 className='header__title'>My Dashboard</h3>
      </Link>
      <MenuToggler/>
        {/* <Navbar /> */}

    </header>
  )
}

export default Header
