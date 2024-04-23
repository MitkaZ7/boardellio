import React from 'react'
import githubLogo from '../../assets/icons/github-icon.svg'
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
const Footer = () => {
  return (
    <div className='footer'>
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mitka.Dev</p>
      <p><a className="footer__icon" href="https://github.com/MitkaZ7/uptrader-dashboard" target='_blank
// '></a></p>
    </div>
  )
}

export default Footer
