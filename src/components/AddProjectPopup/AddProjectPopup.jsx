import React, { useEffect } from 'react'
import Popup from '../Popup/Popup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, closePopup, closeTaskPopup, popupReducer } from '../../store/slices/popupSlice';
import { createProject, getProjects } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { createProjectSchema } from '../../utils/validation.js'
import WithTranslation from '../hoc/WithTranslation';

const AddProjectPopup = ({t}) => {
  const projectAuthor = useSelector((state)=> state.user.user.email)
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ resolver: joiResolver(createProjectSchema) });
  // const navigate = useNavigate();

  const { addProjectPopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);

  const closePopupHandler = () => {
    dispatch(closePopup({ name: 'addProjectPopup' }));
    reset()
  };
  const onSubmit = (formData) => {
    const data = { 
      ...formData, 
      taskQty: 0,
      author: projectAuthor,
    };
    console.log(data)

    dispatch(createProject(data))
      .then(() => dispatch(getProjects()))
      // .then(() => dispatch(closePopup()))
      .then(() => reset());
    closePopupHandler();
  };

  // const closePopupHandler = () => {
   
  //   reset()
  // };

  return (
    <Popup className="popup_type_add-project-popup" isOpen={isOpen} resetForm={reset} popupName={'addProjectPopup'}>
      <form onSubmit={handleSubmit(onSubmit)} className="form add-project-popup">
        <h3 className="form__title">{t('projects-form-add-title')}</h3>
        <fieldset className="form__fieldset form__fieldset_place_add-project">
          <input placeholder={t('projects-form-add-placeholder')} {...register('title')} id='project-title' type='text' className='form__input form__input_place_add-project' />
          <input type="text" placeholder={t('projects-form-add-tag-placeholder')} {...register('tag')} id='project-tag' className='form__input form__input_place_add-project' />
          <input type="text" placeholder={t('projects-form-add-description-placeholder')} {...register('description')} id='project-description' className='form__input form__input_place_add-project' />

        </fieldset>
        
        
        <button type="submit" className="form__button-submit button" disabled={!isValid}>{t('projects-form-add-btn')}</button>
      </form>
    </Popup>
  )
}

export default WithTranslation(AddProjectPopup)