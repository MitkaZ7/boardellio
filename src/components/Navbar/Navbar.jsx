import React, {useState,useRef, useEffect} from 'react';
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
  
  const {isAuthorized, user} = useSelector(state => state.user);
  const { t }= useTranslation();
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.sideMenu)

  function useOutsideСlick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isMenuOpen) {
          dispatch(closeMenu())
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideСlick(menuRef);

 
  

  const handleExitClick = () => {

    dispatch(removeUser()); // Пример действия для удаления пользователя из Redux-хранилища
    navigate('/login'); // Редирект на главную страницу
  
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
          <div className='menu__user-link'>
            {user.email}

          </div>
            <button className='menu__logout-btn' onClick={handleExitClick}></button>
          </>
        )}
      </div>
        
        
        <ul className={`navbar ${isMenuOpen ? activeMenuClassName : ''}`}>
        <li className='navbar__item'><Link to='/projects' className='navbar__link'>{t('menu-item-projects-list')}</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-project-tasks')}</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-contacts')}</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-github')}</Link></li>
         
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
