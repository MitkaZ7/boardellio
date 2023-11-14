import React, {useState,useRef} from 'react'

const Hint = ({children,text}) => {
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
      {isVisible && <span className='hint__text'>{text}</span>}
      
    </div>
  )
}

export default Hint