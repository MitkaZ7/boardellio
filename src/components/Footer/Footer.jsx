import React from 'react'
import githubLogo from '../../assets/icons/github-icon.svg'
const Footer = () => {
  return (
    <footer className='footer'>
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mitka.Dev</p>
      <p><a className="footer__icon" href="https://github.com/MitkaZ7/uptrader-dashboard" target='_blank
// '></a></p>
    </footer>
  )
}

export default Footer
