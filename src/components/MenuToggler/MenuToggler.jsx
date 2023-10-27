import React from 'react'


const MenuToggler = ({onClick, isMenuOpen}) => {
  const activeBarClassName ='menu-toggler__bar_state_active';
  return (

    <div className="header__menu-toggler menu-toggler" onClick={onClick}>
      <span className={`menu-toggler__bar ${isMenuOpen ? activeBarClassName : ' '}`}></span>
      <span className={`menu-toggler__bar ${isMenuOpen ? activeBarClassName : ' '}`}></span>
      <span className={`menu-toggler__bar ${isMenuOpen ? activeBarClassName : ' '}`}></span>
    </div>
  )
}

MenuToggler.propTypes = {}

export default MenuToggler
