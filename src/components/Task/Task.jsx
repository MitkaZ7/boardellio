import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, logicDeleteTask, deleteTask,getTasks } from '../../store/slices/tasksSlice';
import Upload from '../../assets/icons/upload.svg';
import { closePopup } from '../../store/slices/popupSlice';
import Tooltip from '../Tooltip/Tooltip'

const Task = ({ taskId }) => {
  const dispatch = useDispatch();
  const { tasks,selectedTaskData, selectedTaskId } = useSelector(state => state.tasks);
  // const [isDeleted, setIsDeleted] = useState(false);
  // const [isShown, setIsShown] = useState(false);
  const handleRemoveTask = () => {
    // setIsDeleted(!isDeleted);
    dispatch(logicDeleteTask(selectedTaskId))
      .then(() => dispatch(closePopup()))
      .then(()=> dispatch(getTasks()));

  };

  

  // const { 
  //   status, 
  //   priority, 
  //   title,
  //   number,
  //   description,
  // } = selectedTaskData;

  return (
    <>
      {/* {isDeleted && <Tooltip isShown={isShown} messageText={'SUCCESS DELETE'} messageType={'Alert'} />} */}
    <li className='task'>
      <article className='task__content'>
        <header className='task__header'>
          <span className='task__metadata-item task__number'>№: </span>
          <h3></h3>
          <div className='task__metadata-parametres'>
            <span className='task__metadata-item task__priority'>&nbsp;proirity: </span>

            <span className='task__metadata-item task__status'>&nbsp;status: </span>
          </div>
        </header>
        <section className='task__metadata-block metadata-block'>
          <div className='task__metadata-dates'>
            <span className='task__metadata-item task__creation-date'>Created: 27-11-2022&nbsp;</span>
            <span className='task__metadata-item task__spent-time'>In work for: 1 day</span>
            <span className='task__metadata-item task__finish-date'>&nbsp;Done: 02-12-2022</span>
          </div>
          <div className="task__controls">
            {/* <button className="task__controls-btn task-button task__controls-btn_type_edit"></button> */}
            <button className="task__controls-btn task-button task__controls-btn_type_delete" onClick={handleRemoveTask}></button>
            </div>
        </section>
        <p className='task__text'>
        
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
    </>
  )
}

export default Task