import React from 'react'
import Popup from '../Popup/Popup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { openPopup, closePopup, openTaskPopup, closeTaskPopup, popupReducer } from '../../store/slices/popupSlice';



const AddProjectPopup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const closePopupHandler = () => {
    dispatch(closePopup());
  }
  return (
    <Popup className='popup_place_addProjectPopup'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h3 className='form__title'>New project</h3>
        <input placeholder='Insert project name' {...register("projectTitle")} />
        <button type="submit" className="form__button-submit button">Create new project</button>
      </form>
    </Popup>
  )
}

export default AddProjectPopup