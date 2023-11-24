import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const { t } = useTranslation();
const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className='section section-unauthorized'>
      <h1 className='section-unauthorize__title'>{t('unauthorized-title')}</h1>
        <br/>
      <p className='section-unauthorize__subtitle'>{t('unauthorized-subtitle')}</p>
      <button className='button section-unauthorize__button' onClick={goBack}>&larr; {t('unauthorized-button')}</button>
    </section>
  )
}

export default Unauthorized
