import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
const Intro = () => {
  return (
    <section className='intro'>  
      <div>
      <div className="intro__header">
        <h1 className='intro__title'>Welcome to Dashboard</h1>
        <p className='intro__subtitle'>- A single page application</p>
      </div>
      <ul className="intro__features">
        <li className="intro__features-item">Registration/Authorization</li>
        <li className="intro__features-item">Drag'n'Drop oparations</li>        
        <li className="intro__features-item">Task state managment</li>
        <li className="intro__features-item">Projects managment</li>
        <li className="intro__features-item">Сommenting</li>
        <li className="intro__features-item">File uploadind</li>
        <li className="intro__features-item">Form validation</li>
        <li className="intro__features-item">Actual React version</li>
        <li className="intro__features-item">And a litle bit of animations</li>
      </ul>
        <div className="intro__buttons">
          <p className="intro__buttons-title">Choose mode & try it:</p>

          {/* <Link className="intro__link-btn intro__link-btn_type_read-only" to='/registration'>Read only</Link> */}
          <Link className="intro__link-btn" to='/registration'>Full access</Link>

        </div> 
      </div>
      <div>
      <ul className="intro__tech-list">
        <li className="intro__tech-list-item">React 18</li>
        <li className="intro__tech-list-item">Gsap</li>
        <li className="intro__tech-list-item">Axios</li>
        <li className="intro__tech-list-item">Redux</li>
        <li className="intro__tech-list-item">React router dom v6</li>
        <li className="intro__tech-list-item">JOI</li>
        <li className="intro__tech-list-item">Google Firebase</li>
        <li className="intro__tech-list-item">React D'n'D</li>

      </ul>
      </div>
      
    </section>
  )
}

export default Intro