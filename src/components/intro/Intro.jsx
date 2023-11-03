import React, { useEffect, useRef,useState } from 'react'
import { Link } from 'react-router-dom';
import { technologyScroll, buttonHoverAnimation, buttonHoverAnimationReverse } from '../../utils/animations.js'
import technologies from '../../data/technologies.json';
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
import { gsap } from "gsap";
import Hint from '../Hint/Hint.jsx';
const Intro = () => {
  const introRef = useRef();
  const listRef = useRef(null);
  const buttonsRefs = useRef({}); // объект для хранения рефов кнопок
  const subItemButtonClass = '.intro__button-overlay'; // для передачи в функцию анимации ховера на кнопку
  const overlayRef = useRef();
  useEffect(() => {

    const techList = listRef.current.children;
    technologyScroll(techList);

    
  }, []);
 
  
  const handleButtonMouseEnter = (buttonType) => {
    // Вызываем функцию для анимации кнопки при наведении
    const buttonRef = buttonsRefs.current[buttonType];
    if (buttonRef) {
      buttonHoverAnimation(buttonRef, true, subItemButtonClass); 
    }
  };

  const handleButtonMouseLeave = (buttonType) => {
    const buttonRef = buttonsRefs.current[buttonType];
    buttonHoverAnimation(buttonRef, false, subItemButtonClass); // Снятие наведения
  };

  return (
    <section className='intro' ref={introRef}>  
      <FadeInAnimation wrapperElement="div" direction="left">
      <div className="intro__header">
          <h1 className='intro__title'>Welcome to Dashboard</h1>
        <p className='intro__subtitle'>A single page application</p>
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
        <div>
          <p className="intro__buttons-title">Choose mode & try it:</p>
          <div className="intro__buttons">
            <div className='intro__button-container'>
              <Link
                ref={(el) => (buttonsRefs.current['read-only'] = el)} 
                onMouseEnter={() => handleButtonMouseEnter('read-only')}
                onMouseLeave={() => handleButtonMouseLeave('read-only')}
                className="intro__link intro__link_type_read-only" 
                to='/projects'>
                Read only
                <div className='intro__button-overlay' ref={overlayRef}></div>
            </Link>
            </div>
            {/* <div> */}
            <Hint text='Go to registration'>
                <div className='intro__button-container'>
              <Link
                ref={(el) => (buttonsRefs.current['full-access'] = el)} 
                onMouseEnter={() => handleButtonMouseEnter('full-access')}
                onMouseLeave={() => handleButtonMouseLeave('full-access')} 
                className="intro__link intro__link_type_full-access" 
                to='/registration'>
                  Full access
                  <div className='intro__button-overlay' ref={overlayRef}></div>
              </Link>
                </div>
            </Hint>
            {/* </div> */}
          </div>
        </div> 
      </FadeInAnimation>
      <FadeInAnimation wrapperElement="div" direction="right">
      <p className='intro__comment-about-stack'>developed with:</p>
        <ul className="intro__tech-list" ref={listRef}>
          {Object.entries(technologies).map(([techKey,techData]) => (
            <li key={techKey} className="intro__tech-list-item">{techData.title}</li>
          ))}
        {/* <li className="intro__tech-list-item">Developed with:</li> */}
      </ul>
      </FadeInAnimation>
      
    </section>
    
  )
}

export default Intro