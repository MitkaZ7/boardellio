import React from 'react'
import Popup from '../Popup/Popup'
import Task from '../Task/Task'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
const TaskPopup = () => {
  const dispatch = useDispatch();
  const openedTaskId = useSelector((state) => state.popup.openedTaskId);
 
  const closePopupHandler = () => {
    dispatch(closePopup());
  }
  const { isOpen, popupData } = useSelector((state) => state.popup);
  return (
    <Popup>
      <Task popupData={popupData} />
    </Popup>
  )
}

export default TaskPopup