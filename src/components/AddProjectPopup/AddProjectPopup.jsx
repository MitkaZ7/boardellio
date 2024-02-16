import React, { useEffect } from 'react'
import Popup from '../Popup/Popup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, closePopup, openTaskPopup, closeTaskPopup, popupReducer } from '../../store/slices/popupSlice';
// import { closeAddProjectPopup, setAddProjectPopupData } from '../../store/slices/popupSlice';
import { createProject, getProjects } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
// import { closePopup } from '../../store/slices/popupSlice';
import { createProjectSchema } from '../../utils/validation.js'
import { useTranslation } from 'react-i18next';

const AddProjectPopup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ resolver: joiResolver(createProjectSchema) });
  // const navigate = useNavigate();
  const { isOpen, data } = useSelector((state) => state.popup.addProjectPopup);
  const { t } = useTranslation();

  const onSubmit = (formData) => {
    dispatch(createProject(formData))
      .then(() => dispatch(getProjects()))
      .then(() => dispatch(closePopup()))
      .then(() => reset());
  };

  const closePopupHandler = () => {
    dispatch(closePopup());
    reset()
  };

  return (
    <Popup className="popup_place_addProjectPopup" isOpen={isOpen} onClose={closePopupHandler} resetForm={reset}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h3 className="form__title">{t('projects-form-add-title')}</h3>
        <input placeholder={t('projects-form-add-placeholder')}{...register('title')} id='project-title' type='text' />
        <button type="submit" className="form__button-submit button" disabled={!isValid}>{t('projects-form-add-btn')}</button>
      </form>
    </Popup>
  )
}

export default AddProjectPopup