import React,{useEffect} from 'react'
import Popup from '../Popup/Popup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
// import { openPopup, closePopup, openTaskPopup, closeTaskPopup, popupReducer } from '../../store/slices/popupSlice';
import { closeAddProjectPopup, setAddProjectPopupData } from '../../store/slices/popupSlice';
import { createProject } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../../store/slices/projectSlice';
import { closePopup } from '../../store/slices/popupSlice';


const AddProjectPopup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // const navigate = useNavigate();
  const { isOpen, data } = useSelector((state) => state.popup.addProjectPopup);

  const onSubmit = (formData) => {
    console.log('Form submitted!');
    dispatch(createProject(formData))
      .then(() => dispatch(getProjects()))
      .then(() => dispatch(closePopup()));
  };

  // useEffect(() => {
  //   reset(); // 
  // }, [isOpen, reset]);


  const closePopupHandler = () => {
    dispatch(closeAddProjectPopup());
    reset()
  };
  
  // const onSubmit = data => {
  //   console.log(data);
  // };
  
  // const closePopupHandler = () => {
  //   dispatch(closePopup());
  // }
  return (
    <Popup className="popup_place_addProjectPopup" isOpen={isOpen} onClose={closePopupHandler} resetForm={reset}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h3 className="form__title">New project</h3>
        <input placeholder="Insert project name" {...register("name")} />
        <button type="submit" className="form__button-submit button">Create new project</button>
      </form>
    </Popup>
  )
}

export default AddProjectPopup