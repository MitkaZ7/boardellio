import React from 'react'
import { Link } from 'react-router-dom'
import MenuToggler from '../MenuToggler/MenuToggler'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import { openMenu, closeMenu } from '../../store/slices/sideMenuSlice'
// import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import OptionsPanel from '../OptionsPanel/OptionsPanel';
const Navbar = () => {
  const { t }= useTranslation();
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.sideMenu)
 
  const activeMenuClassName = 'navbar_state_active';
  // function handleToggleMenu() {
  //   if (isMenuOpen) {
  //     dispatch(closeMenu());
  //   } else {
  //     dispatch(openMenu());
  //   }
  // }
  return (
  
    <div className={`menu ${isMenuOpen ? 'menu_state_active' : ''}`}>
    
        
        <ul className={`navbar ${isMenuOpen ? activeMenuClassName : ''}`}>
        <li className='navbar__item'><Link to='/projects' className='navbar__link'>{t('menu-item-projects-list')}</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-project-tasks')}</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-contacts')}</Link></li>
        <li className='navbar__item'><Link to='tasks' className='navbar__link'>{t('menu-item-github')}</Link></li>
         
        </ul>
      
        {isMenuOpen && 
          <div className='navbar__site-settings'>
          <p className="navbar__subtitle">{t('menu-settings')}</p>
            <OptionsPanel />
          </div>}
        

      
      {/* <MenuToggler onClick={handleToggleMenu} isMenuOpen={isMenuOpen}/> */}
      
    </div>
  )
}

export default Navbar
