import React from 'react'
import Popup from '../ConfirmPopup/ConfirmPopup'
import { useDispatch, useSelector } from 'react-redux';

const ConfirmPopup = () => {
    const { confirmPopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);


  return (
      <Popup isOpen={isOpen} popupName={'confrimPopup'}>
            <div className="confrim-popup">
                <button className="confrim-popup__button">
                    yes
                </button>
                <button className="confrim-popup__button">
                    no
                </button>
            </div>

      </Popup>
  )
}

export default ConfirmPopup