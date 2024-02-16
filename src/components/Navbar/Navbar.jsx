import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../store/slices/userSlice';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import OptionsPanel from '../OptionsPanel/OptionsPanel';
import { closeMenu } from '../../store/slices/sideMenuSlice'
const Navbar = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { isAuthorized, user } = useSelector(state => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.sideMenu)



  const handleExitClick = () => {
    dispatch(removeUser());
    navigate('/login');
    dispatch(closeMenu())
  };

  // const handleProfileClick = () => {
  //   // Логика для перехода на страницу профиля или другие действия
  //   // ...
  //   setIsDropdownMenuOpen(false); // Закрываем дропдаун
  // };
  // const handleUserLinkClick = (evt) => {
  //   evt.stopPropagation(); // Препятствует всплытию события к родительским элементам
  //   setIsDropdownMenuOpen((prev) => !prev);
  // };

  const activeMenuClassName = 'navbar_state_active';

  return (

    <div ref={menuRef} className={`menu ${isMenuOpen ? 'menu_state_active' : ''}`} >
      <div className="menu__user-container">
        {(isMenuOpen && isAuthorized) && (
          <>
            <div className='menu__user-link' onClick={() => navigate('users/me')}>
              {user.email}

            </div>
            <button className='menu__logout-btn' onClick={handleExitClick}></button>
          </>
        )}
        {
          (isMenuOpen && !isAuthorized) && (
            <div className="menu__entrance-buttons entrance-buttons" onClick={() => dispatch(closeMenu())}>
              <button className='entrance-buttons__button'>
                <Link to='/login'>{t('log-in')}</Link>
              </button>
              {/* <span className="">or</span> */}
              <button className='entrance-buttons__button'>
                <Link to='/registration'>{t('sign-up')}</Link>
              </button>
            </div>
          )
        }
      </div>


      <ul className={`navbar ${isMenuOpen ? activeMenuClassName : ''}`} onClick={(() => dispatch(closeMenu()))}>
        {isAuthorized &&
          <>
            <li className='navbar__item'><Link to='/projects' className='navbar__link'>{t('menu-item-projects-list')}</Link></li>
            {/* <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-project-tasks')}</Link></li> */}
          </>
        }

        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-contacts')}</Link></li>
        <li className='navbar__item'><Link to='https://github.com/MitkaZ7/boardellio' className='navbar__link' target="_blank">{t('menu-item-github')}</Link></li>
        <li className='navbar__item'><Link to='/changelog' className='navbar__link'>{t('menu-item-changelog')}</Link></li>

      </ul>

      {isMenuOpen && <>
        <div className='navbar__site-settings'>
          <p className="navbar__subtitle">{t('menu-settings')}</p>
          <OptionsPanel />
        </div>

      </>
      }




      {/* <MenuToggler onClick={handleToggleMenu} isMenuOpen={isMenuOpen}/> */}

    </div>
  )
}

export default Navbar
