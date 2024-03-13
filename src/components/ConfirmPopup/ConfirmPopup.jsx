import React,{useEffect} from 'react'
import Popup from '../Popup/Popup'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import WithTranslation from '../hoc/WithTranslation';
const ConfirmPopup = ({agreeHandler,t}) => {
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
                  <p className="confirm-popup__text">{t('confrirm-delete')}</p>
                  <div className="confirm-popup__buttons-wrap">
                      <button className="confirm-popup__button confirm-popup__button_type_agreement" onClick={agreeClickHandler}>
                          {t('agree')}
                      </button>
                      <button className="confirm-popup__button confirm-popup__button_type_decline" onClick={declineClickHandler}>
                          {t('disagree')}
                      </button>
                </div>
                 
              </div>

          </Popup>
      )
  
}

export default WithTranslation(ConfirmPopup)