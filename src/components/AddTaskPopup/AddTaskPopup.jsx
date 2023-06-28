import React from 'react'
import Popup from '../Popup/Popup'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { closePopup } from '../../store/slices/popupSlice'
import { setActiveTaskId } from '../../store/slices/tasksSlice';
const AddTaskPopup = () => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closePopup());
    setActiveTaskId(null); // Сброс активного taskId
  };
  return (
    
    <Popup>
        <Form/>
    </Popup>
  )
}

export default AddTaskPopup