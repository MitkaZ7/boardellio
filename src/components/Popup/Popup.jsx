import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { useForm } from 'react-hook-form'

const Popup = ({ children, popupName, isOpen, }) => {
  // const { isOpen } = useSelector((state) => state.popup);

  const dispatch = useDispatch();
  function closePopupHandler() {
    dispatch(closePopup({ name: popupName }));
     
  }

  
  const closeByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopupHandler(popupName)
    }
  }

  useEffect(() => {
    console.log(isOpen)
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closePopupHandler(popupName)
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  return (
    
    <div className={`popup ${isOpen ? 'popup_state_open' : ''}`} onClick={closeByOverlayClick}>
      <div className="popup__container">
        <button className="popup__button-close button" type="reset" onClick={closePopupHandler}></button>
        {children}
      </div>
    </div>

  )
}

export default Popup
