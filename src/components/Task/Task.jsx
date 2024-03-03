import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOneTask, logicDeleteTask, resetSelectedTaskData,getTasks } from '../../store/slices/tasksSlice';
import Upload from '../../assets/icons/upload.svg';
import { closePopup } from '../../store/slices/popupSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editTaskSchema } from '../../utils/validation';
import CustomSelect from '../CustomSelect/CustomSelect';
import { updateTask, updateTaskStatus } from '../../store/slices/tasksSlice';
import Select from 'react-select';
import Tooltip from '../Tooltip/Tooltip';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { daysCount, formateDate } from '../../utils/formateDate'
import { useTranslation } from 'react-i18next'
import { taskPriorityOptions, taskStatusOptions } from '../../utils/constants'

const Task = ({ taskId }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTaskData, selectedTaskId } = useSelector(state => state.tasks);
  const projecTitle  = useSelector(state => state.projects.selectedProject.title.stringValue);
  const projectTag = useSelector(state => state.projects.selectedProject.tag.stringValue);
  const [taskWorkTime, setTaskWorkTime] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskPriority, setSelectedTaskPriority] = useState(taskPriorityOptions.find(option => option.value === selectedTaskData.priority.stringValue));
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(taskStatusOptions.find(option => option.value === selectedTaskData.status.stringValue));
  
  const { 
    register, 
    handleSubmit, 
    reset } = useForm({
    resolver: joiResolver(editTaskSchema),
  });

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
//
  useEffect(() => {
    if (selectedTaskData) {
      reset({
        title: selectedTaskData.title.stringValue,
        status: selectedTaskData.status.stringValue,
        projectTitle: projecTitle,
        priority: selectedTaskData.priority.stringValue,
        description: selectedTaskData.description.stringValue,
      });
    }
  }, [selectedTaskData, reset, projecTitle]);


  const onSubmit = (data) => {
    // console.log(data)
    dispatch(updateTask({ taskId: selectedTaskId, newData: data }))
      .then(() => setIsEditing(false))
      .catch((error) => console.log(error));
  };

  const handleSelectChangeStatus = (evt) => {
    const reselectedStatus = evt.target.value;
    
    setSelectedTaskStatus(reselectedStatus);
    // const formData = {
    //   status: reselectedStatus,
    // };
    // dispatch(updateTask({ taskId: selectedTaskId, newData: reselectedStatus }));
  };

  const handleSelectChangePriority = (selectedOption) => {
    setSelectedTaskPriority(selectedOption);
    const formData = {
      priority: selectedOption.value,
    };
    dispatch(updateTask({ taskId: selectedTaskId, newData: formData }));
  };


  
  
  return (
    
    <>
      {selectedTaskData && (
    <li className='task'>
      <article className='task__content'>
        <header className='task__header'>
          <span className='task__data-item task__number' onClick={navigateToProjectPage}>
            {projectTag}-{selectedTaskData.number.integerValue}:
          </span>
          <textarea  {...register("title")} type="text" className="task__task-title task__textarea-item" readOnly={isEditing ? false : true} />
          <div className='task__data-item task__status'>
            <select
              className="form__select task__select-status"
              {...register('status')}
              onChange={handleSelectChangeStatus}
              defaultValue={selectedTaskStatus}
            >
              {
                taskStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                  ))
              }
            </select>    
          </div>
          <h4 className='task__project-title' onClick={navigateToProjectPage}>
                {t('project')}: {projecTitle}
          </h4>
        </header>
        <section className='task__data-block data-block'>
          <div className='task__data-dates'>
                <span className='task__data-item task__creation-date'>{t('created')}:&nbsp;  
              {formateDate(selectedTaskData.createTime)}
            </span>
                <span className='task__metadata-item task__work-time'>{t('in-work')}: {
                  daysCount(selectedTaskData.createTime)
            }
            </span>
          </div>
              <div className='task__data-item task__priority'>
                <select
                  className="form__select task__select-status"
                  {...register("priority")}
                  onChange={handleSelectChangePriority}
                  defaultValue={selectedTaskPriority}
                >
                  {
                    taskPriorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                  }
                </select>
              </div>
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
           
        </section>
            <textarea className='task__text task__textarea-item' readOnly={isEditing ? false : true} {...register("description")}>
            </textarea>
        

            <div className="task__controls">
              {isEditing ? (
                <>
                  <button className="task__controls-btn task-button task__controls-btn_type_save" onClick={handleSubmit(onSubmit)}>
                    {t('save')}
                  </button>
                  <button className="task__controls-btn task-button task__controls-btn_type_cancel" onClick={() => setIsEditing(false)}>
                    {t('cancel')}
                  </button>
                </>
              ) : (
                <button className="task__controls-btn task-button task__controls-btn_type_edit" onClick={() => setIsEditing(true)}>
                    {t('edit')}
                </button>
              )}
              <button className="task__controls-btn task-button task__controls-btn_type_delete" onClick={handleRemoveTask}></button>
            </div>
      </article>
    </li>
      )}
    </>
  )
}

export default Task