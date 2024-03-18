import React, { useEffect, useRef,useState } from 'react'
import { Link } from 'react-router-dom';
import { technologyScroll, buttonHoverAnimation, buttonHoverAnimationReverse } from '../../utils/animations.js'
import technologies from '../../data/technologies.json';
import FadeInAnimation from "../FadeInAnimtion/FadeInAnimation";
import { gsap } from "gsap";
import Hint from '../Hint/Hint.jsx';
import WithTranslation from '../hoc/WithTranslation';


const Intro = ({t}) => {

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
      <div>
      <div className="intro__header">
          <h1 className='intro__title'>{t('intro-title')}</h1>
          <p className='intro__subtitle'>{t('intro-subtitle')}</p>
      </div>
        <ul className="intro__features">
          <li className="intro__features-item">{t('features.Registration/Authorization')}</li>
          <li className="intro__features-item">{t(`features.Drag'n'Drop oparations`)}</li>        
          <li className="intro__features-item">{t('features.Task state managment')}</li>
          <li className="intro__features-item">{t('features.Projects managment')}</li>
          {/* <li className="intro__features-item">{t('features.Сommenting')}</li> */}
          {/* <li className="intro__features-item">{t('features.File uploadind')}</li> */}
          <li className="intro__features-item">{t('features.Form validation')}</li>
          <li className="intro__features-item">{t('features. React 18 version')}</li>
          <li className="intro__features-item">{t('features.Re-usable components')}</li>
          <li className="intro__features-item">{t('features.And a litle bit of animations')}</li>
          <li className="intro__features-item">{t('features.Theme changing')}</li>
          <li className="intro__features-item">{t('features.internationalization')}</li>

      </ul>
        <div>
          <p className="intro__buttons-title">{t('intro-access-choice-title')}</p>
          <div className="intro__buttons">
            {/* <div className='intro__button-container'>
              <Link
                ref={(el) => (buttonsRefs.current['read-only'] = el)} 
                onMouseEnter={() => handleButtonMouseEnter('read-only')}
                onMouseLeave={() => handleButtonMouseLeave('read-only')}
                className="intro__link intro__link_type_read-only" 
                to='/projects'>
                {t('intro-btn-readonly')}
                <div className='intro__button-overlay' ref={overlayRef}></div>
            </Link>
            </div> */}
            {/* <div> */}
            <Hint text='Go to registration'>
                <div className='intro__button-container'>
              <Link
                ref={(el) => (buttonsRefs.current['full-access'] = el)} 
                onMouseEnter={() => handleButtonMouseEnter('full-access')}
                onMouseLeave={() => handleButtonMouseLeave('full-access')} 
                className="intro__link intro__link_type_full-access" 
                to='/registration'>
                  {t('intro-btn-fullaccess')}
                  <div className='intro__button-overlay' ref={overlayRef}></div>
              </Link>
                </div>
            </Hint>
            {/* </div> */}
          </div>
        </div> 
      </div>
      <div>
        <p className='intro__comment-about-stack'>{t('intro-tech-title')}</p>
        <ul className="intro__tech-list" ref={listRef}>
          {Object.entries(technologies).map(([techKey,techData]) => (
            <li key={techKey} className="intro__tech-list-item">{techData.title}</li>
          ))}
        {/* <li className="intro__tech-list-item">Developed with:</li> */}
      </ul>
      </div>
      
    </section>
    
  )
}

export default WithTranslation(Intro);