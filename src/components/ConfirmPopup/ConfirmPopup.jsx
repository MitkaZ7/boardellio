import React,{useEffect} from 'react'
import Popup from '../Popup/Popup'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
const ConfirmPopup = ({agreeHandler}) => {
    const dispatch = useDispatch();
    const { confirmPopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);
 
    const agreeClickHandler = () => {
        dispatch(closePopup({ name: 'confirmPopup' }))
        agreeHandler();

    }
    const declineClickHandler = () => {
        dispatch(closePopup({name: 'confirmPopup'}))
    }


      return (
          <Popup className="popup_type_confirm-popup" isOpen={isOpen} popupName={'confirmPopup'}>
              <div className="confirm-popup">
                  <button className="confirm-popup__button confirm-popup__button_type_agreement" onClick={agreeClickHandler}>
                    yes
                </button>
                  <button className="confirm-popup__button confirm-popup__button_type_decline" onClick={declineClickHandler}>
                    no
                </button>
              </div>

          </Popup>
      )
  
}

export default ConfirmPopup