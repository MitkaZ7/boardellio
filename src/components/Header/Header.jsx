import React, { useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import logoMonochrome from '../../assets/icons/logo-monochrome.svg'
import Navbar from '../Navbar/Navbar'
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";

import MenuToggler from '../MenuToggler/MenuToggler'
import { useSelector, useDispatch } from 'react-redux';
import { openMenu, closeMenu } from '../../store/slices/sideMenuSlice'
import WithTranslation from '../hoc/WithTranslation';

const Header = ({t}) => {
  const { isAuthorized } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.sideMenu)
 
  function handleToggleMenu() {
    if (isMenuOpen) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  }
  const theme = useSelector(state => state.theme);

  return (
    <header className='header'>
      <Link to={`${!isAuthorized ? '/' : '/projects'}`}>
        <img src={theme === 'dark' ? logo : logoMonochrome} className='header__logo'></img>
      </Link>
      <div className="header__title-wrapper">
        <Link to={`${!isAuthorized ? '/' : '/projects'}`}>
          <h3 className='header__title'>{t('project-title')}</h3>
        </Link>
      </div>


      <Navbar />
      <MenuToggler onClick={handleToggleMenu} isMenuOpen={isMenuOpen} />

    </header>
  )
}

export default WithTranslation(Header);
