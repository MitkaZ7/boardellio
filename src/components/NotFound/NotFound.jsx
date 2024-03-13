import React from 'react'
import WithTranslation from '../hoc/WithTranslation'
const NotFound = ({t}) => {
  return (
      <section className='section section-notfound'>
          <h3 className='section-notfound__title'>404. {t('404-title')}</h3> 
     
      <p className='section-notfound__text'>{t('404-notfound-text')}</p>
      <p className='section-notfound__text'>{t('404-unavaliable-text')}</p>
      <p className='section-notfound__text'>{t('404-check-please-text')}</p>
    </section>
  )
}

export default WithTranslation(NotFound);