import React from 'react'

const LangSelect = () => {
  return (
    <select className='langSelect'>
        <option value="ru" className="langSelect__lang">ru</option>
        <option value="en" className="langSelect__lang">en</option>
    </select>
  )
}

export default LangSelect