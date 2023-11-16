import React, {useState,useRef} from 'react'
import { useTranslation } from 'react-i18next';
const Hint = ({children,text}) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const refSetTimeout = useRef();
    const onMouseEnterHandler = () => {
      refSetTimeout.current = setTimeout(() => {
        setIsVisible(true)
      }, 300);

    }
    const onMouseLeaveHandler = () => {
        clearTimeout(refSetTimeout.current);
        setIsVisible(false);
    }

  return (
    <div className={`hint ${isVisible ? 'hint_state_active' : ''}`} onMouseOver={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} >
      {children}
      {isVisible && <span className='hint__text'>{t('intro-hint')}</span>}
      
    </div>
  )
}

export default Hint