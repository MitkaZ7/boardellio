import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOneTask, logicDeleteTask, resetSelectedTaskData,getTasks } from '../../store/slices/tasksSlice';
import Upload from '../../assets/icons/upload.svg';
import { closePopup } from '../../store/slices/popupSlice';
import Tooltip from '../Tooltip/Tooltip'
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { daysCount, formateDate } from '../../utils/formateDate'
import { useTranslation } from 'react-i18next'
const Task = ({ taskId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedTaskData, selectedTaskId } = useSelector(state => state.tasks);
  const { projectName } = useSelector(state => state.projects.selectedProject)
  const [taskWorkTime, setTaskWorkTime] = useState('')
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
            <span className='task__metadata-item task__number'>№: </span>
            {selectedTaskData.title.stringValue}
          </h3>
          <h4 className='task__project-title'>
            {projectName}
          </h4>
          
              
          <div className='task__metadata-parametres'>
                <span className='task__metadata-item task__priority'>proirity: {selectedTaskData.priority.stringValue}</span>

                <span className='task__metadata-item task__status'>status: {selectedTaskData.status.stringValue}</span>
          </div>
        </header>
        <section className='task__metadata-block metadata-block'>
          <div className='task__metadata-dates'>
                <span className='task__metadata-item task__creation-date'>{t('created')}: {formateDate(selectedTaskData.createTime)}&nbsp;</span>
            {/* <span className='task__metadata-item task__spent-time'>In work for: {
                  daysCount(selectedTaskData.createTime)
            }
            </span> */}

            {
                selectedTaskData.isCompleted.booleanValue ? 
                    <span className='task__metadata-item task__finish-date'>
                      &nbsp;{t('done')}: сегодня
                    </span>
                    :
                    <span className='task__metadata-item task__finish-date'>
                      &nbsp;{t('done')}: не завершена.
                    </span>
            }

            {/* <span className='task__metadata-item task__finish-date'>&nbsp;{t('done')}: {
                  !selectedTaskData.isCompleted.booleanValue ? 'DDD' : 'NNNN'
            }</span> */}
          </div>
          <div className="task__controls">
            {/* <button className="task__controls-btn task-button task__controls-btn_type_edit"></button> */}
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