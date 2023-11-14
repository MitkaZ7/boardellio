import React from 'react'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import LangSelect from '../LangSelect/LangSelect'
const OptionsPanel = () => {
  return (
    <div className='optionsPanel'>
        <ThemeSwitcher/>
        <LangSelect/>
    </div>
  )
}

export default OptionsPanel