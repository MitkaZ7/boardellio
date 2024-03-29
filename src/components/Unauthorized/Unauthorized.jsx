import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import WithTranslation from '../hoc/WithTranslation';
const Unauthorized = ({t}) => {
 
  const navigate = useNavigate();
  const goBack = () => navigate('/login');

  return (
    <section className='section section-unauthorized'>
      <h1 className='section-unauthorized__title'>{t('unauthorized-title')}</h1>
      <p className='section-unauthorized__subtitle'>{t('unauthorized-subtitle')}</p>
      <button className='button section-unauthorized__button' onClick={goBack}>{t('unauthorized-button')}</button>
    </section>
  )
}

export default WithTranslation(Unauthorized);
