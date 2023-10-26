import React from 'react'
import githubLogo from '../../assets/icons/github-icon.svg'
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
const Footer = () => {
  return (
    <FadeInAnimation className='footer' wrapperElement="footer" direction="up">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mitka.Dev</p>
      <p><a className="footer__icon" href="https://github.com/MitkaZ7/uptrader-dashboard" target='_blank
// '></a></p>
    </FadeInAnimation>
  )
}

export default Footer
