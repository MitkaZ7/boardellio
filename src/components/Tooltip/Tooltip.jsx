import React,{useEffect,useState, useRef} from 'react'
import { fadeInToDown } from '../../utils/animations'
const Tooltip = ({messageText, messageType, isShown}) => {
   const tooltipRef = useRef(null);
    useEffect(() => {
      fadeInToDown(tooltipRef.current)
    }, [])
    

  return (
      <div ref={tooltipRef} className={`tooltip`}>
          <div className="tooltip__container">
              {/* <span className="tooltip__message">{messageText}</span> */}
              <div className="tooltip__message">
                {/* <span className="tooltip__message-type">
                    {messageType}
                </span> */}
                  {messageText}       
              </div>
          </div>
      </div>

  )
}

export default Tooltip