import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOneTask, logicDeleteTask, resetSelectedTaskData,getTasks } from '../../store/slices/tasksSlice';
import Upload from '../../assets/icons/upload.svg';
import { closePopup } from '../../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';

import Tooltip from '../Tooltip/Tooltip'
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { daysCount, formateDate } from '../../utils/formateDate'
import { useTranslation } from 'react-i18next'
const Task = ({ taskId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { selectedTaskData, selectedTaskId } = useSelector(state => state.tasks);
  const projecTitle  = useSelector(state => state.projects.selectedProject.title.stringValue);
  const projectTag = useSelector(state => state.projects.selectedProject.tag.stringValue);
  const [taskWorkTime, setTaskWorkTime] = useState('');


  const navigateToProjectPage = () => {
    dispatch(closePopup());
  }

  const handleRemoveTask = () => {
    dispatch(logicDeleteTask(selectedTaskId))
      .then(() => dispatch(closePopup()))
      .then(()=> dispatch(getTasks()));

  };
  const handleTaskWorkTimeCounter = (creationDate) => {
    console.log(creationDate)
    setTaskWorkTime(creationDate)
  }
  useEffect(() => {
    if (selectedTaskId) {
      dispatch(showLoader());
      dispatch(getOneTask(selectedTaskId))
        .then(() => dispatch(hideLoader()))
        .catch(() => dispatch(hideLoader()));
    }
    return () => {
      dispatch(resetSelectedTaskData());
    };
  }, [dispatch, selectedTaskId]);

  return (
    
    <>
      {selectedTaskData && (
    <li className='task'>
      <article className='task__content'>
        <header className='task__header'>
          <h3 className='task__task-title'>
                <span className='task__data-item task__number' onClick={navigateToProjectPage}>
              {projectTag}-{selectedTaskData.number.integerValue}: 
            </span>
                &nbsp;{selectedTaskData.title.stringValue}
          </h3>
          <p className='task__data-item task__status'>
            {t('status')}:&nbsp;{selectedTaskData.status.stringValue}
          </p>
          
          <h4 className='task__project-title' onClick={navigateToProjectPage}>
            {projecTitle}
          </h4>
        </header>
        <section className='task__data-block data-block'>
          <div className='task__data-dates'>
                <span className='task__data-item task__creation-date'>{t('created')}:&nbsp;  
              {formateDate(selectedTaskData.createTime)}
            </span>
                <span className='task__metadata-item task__work-time'>{t('in-work')}: 3 дня {
                  daysCount(selectedTaskData.createTime)
            }
            </span>
          </div>
              <p className='task__data-item task__priority'>
                {t('priority')}: {selectedTaskData.priority.stringValue}
              </p>
            {/* {
                selectedTaskData.isCompleted.booleanValue ? 
                    <span className='task__metadata-item task__finish-date'>
                      &nbsp;{t('done')}: сегодня
                    </span>
                    :
                    <span className='task__metadata-item task__finish-date'>
                      &nbsp;{t('done')}: не завершена.
                    </span>
            } */}

            {/* <span className='task__metadata-item task__finish-date'>&nbsp;{t('done')}: {
                  !selectedTaskData.isCompleted.booleanValue ? 'DDD' : 'NNNN'
            }</span> */}
          
          <div className="task__controls">
            <button className="task__controls-btn task-button task__controls-btn_type_edit"></button>
            <button className="task__controls-btn task-button task__controls-btn_type_delete" onClick={handleRemoveTask}></button>
            </div>
        </section>
        <p className='task__text'>
              {selectedTaskData.description.stringValue}
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
      )}
    </>
  )
}

export default Task