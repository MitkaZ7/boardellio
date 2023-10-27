import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import Navbar from '../Navbar/Navbar'
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
// import MenuToggler from '../MenuToggler/MenuToggler'
const Header = () => {
 

  return (
    <header className='header' wrapperElement="header" direction="down">
      <img src={logo} className='header__logo'></img>
      <Link to='/'>
        <h3 className='header__title'>My Dashboard</h3>
      </Link>
    
      <Navbar />

    </header>
  )
}

export default Header
