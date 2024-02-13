import React from 'react'

const NotFound = () => {
  return (
      <section className='section section-notfound'>
          <h2 className='section-notfound__title'>404. Page not found.</h2> 
     
          <p className='section-notfound__text'>Unfortunately the page you were looking for could not be found.</p>
          <p className='section-notfound__text'>It may be
              temporarily unavailable, moved or no longer exist. </p>
          <p className='section-notfound__text'>Check the URL you entered for any mistakes and try again.</p>
    </section>
  )
}

export default NotFound