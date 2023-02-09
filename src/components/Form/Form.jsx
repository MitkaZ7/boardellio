import React, { useState } from 'react'
import Upload from '../../assets/icons/upload.svg'
import { useDispatch } from 'react-redux'

import { closePopup } from '../../store/slices/popupSlice'
import { addTask, getTasks, createTask } from '../../store/slices/tasksSlice'
import {useForm, reset} from 'react-hook-form'
import Parse from 'parse/dist/parse.min.js';





const Form = () => {
   
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState } = useForm();
  
    const onSubmit = async data => {
        dispatch(createTask({
            title: data.title, 
            isCompleted: false,
            description: data.description,
            priority: data.priority,
        }))
        // console.log(data)

      
        // const task = new Parse.Object('Task');
        // task.set('title','11gfffsssffffd sdf');
        // await task.save();
  
        dispatch(closePopup())
       
    };
   
    
  return (
      <form id="form" action='#' className='form' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='form__title'>Add new task</h3>
          <fieldset className='form__fieldset'>
              <input className="form__input" {...register("title")} />
              <select className='form__select' {...register("project")}>
                  <option value='noNameProject'>Select a project</option>
                  <option value="TODO React SPA">TODO React SPA</option>
                  <option value="Dashboard React SPA">Dashboard React SPA</option>
                  <option value="Vue weather App">Vue weather App</option>
              </select>
              <select className='form__select' {...register("priority")}>
                  <option value='usual'>Assign priority</option>
                  <option value='usual'>usual</option>
                  <option value='seriuosly'>seriuosly</option>
                  <option value='critical'>critical</option>
              </select>
          </fieldset>
          <textarea className="form__text-area" {...register("description")} placeholder="Add task text" spellCheck="true"></textarea>
          <div className="form__file-wrapper">
              <label className="form__input-label" htmlFor="file">
                  <span className="form__input-icon-wrapper"><img className="popup__form-load-icon" src={Upload} alt="select files"></img></span>
                  <span className="form__input-file-text">Upload files...</span>
              </label>
              <input className="form__input-file" id="file" name="file" type="file" multiple />

          </div>
          <button type="submit" className="form__button-submit button">Add</button>
      </form>
  )
}

export default Form