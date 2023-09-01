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
  return (
    <Popup>
      <Task/>
    </Popup>
  )
}

export default TaskPopup