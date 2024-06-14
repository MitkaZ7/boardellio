import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showTooltip, hideTooltip } from '../../store/slices/tooltipSlice';


const Tooltip = ({ messageText }) => {
  const dispatch = useDispatch();
  const { isShown, message } = useSelector(state => state.tooltip);
  const tooltipRef = useRef(null);


  return (
    <>
      {isShown && <div ref={tooltipRef} className={'tooltip'}>
        <div className="tooltip__container">
          <span className="tooltip__message">{messageText}</span>
        </div>
      </div>}
    </>
  );
};

export default Tooltip;
