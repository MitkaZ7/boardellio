import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeTask } from '../../store/slices/tasksSlice';
import Upload from '../../assets/icons/upload.svg';

const Task = ({ taskId }) => {
  const dispatch = useDispatch();
  const { selectedTaskData } = useSelector(state => state.tasks)
  const handleRemoveTask = () => {
    dispatch(removeTask(taskId));
  };

  const { 
    status, 
    priority, 
    title,
    number,
    description,
  } = selectedTaskData;

  return (
    <li className='task'>
      <article className='task__content'>
        <h3 className='task__header'>
          <span className='task__metadata-item task__number'>№ {number}: </span>
          {title}
          <div className='task__metadata-parametres'>
            <span className='task__metadata-item task__priority'>&nbsp;proirity: {priority}</span>

            <span className='task__metadata-item task__status'>&nbsp;status: {status}</span>
          </div>
        </h3>
        <section className='task__metadata-block metadata-block'>
          <div className='task__metadata-dates'>
            <span className='task__metadata-item task__creation-date'>Created: 27-11-2022&nbsp;</span>
            <span className='task__metadata-item task__spent-time'>In work for: 1 day</span>
            <span className='task__metadata-item task__finish-date'>&nbsp;Done: 02-12-2022</span>
          </div>
        </section>
        <p className='task__text'>
          {description}
        </p>

        {/* <section className='task__subtasks subtasks'>
          <ul className='subtasks__list'>
            <Subtask/>
          </ul>
        </section> */}
        <section className="form__file-wrapper">
          <label className="form__input-label" htmlFor="file">
            <span className="form__input-icon-wrapper">
              <img className="popup__form-load-icon" src={Upload} alt="select files"></img>
            </span>
            <span className="form__input-file-text">Upload files...</span>
          </label>
          <input className="form__input-file" id="file" name="file" type="file" multiple />
        </section>
        {/* <section className='task__comments comments'>
          <ul className='comments__list'>
            <CommentItem />
          </ul>
        </section> */}
        {/* <button onClick={handleRemoveTask}>Remove task</button> */}
      </article>
    </li>
  )
}

export default Task