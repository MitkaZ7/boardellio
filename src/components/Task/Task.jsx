import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOneTask, logicDeleteTask, resetSelectedTaskData,getTasks } from '../../store/slices/tasksSlice';
import Upload from '../../assets/icons/upload.svg';
import { closePopup, openPopup } from '../../store/slices/popupSlice';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editTaskSchema } from '../../utils/validation';
import CustomSelect from '../CustomSelect/CustomSelect';
import { updateTask, updateTaskStatus } from '../../store/slices/tasksSlice';
import Tooltip from '../Tooltip/Tooltip';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { daysCount, formateDate } from '../../utils/formateDate'
import { useTranslation } from 'react-i18next'
import { taskPriorityOptions, taskStatusOptions } from '../../utils/constants'

const Task = ({ taskId }) => {
  const saveButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const btnsEditModeRef = useRef(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTaskData, selectedTaskId } = useSelector(state => state.tasks);
  const projecTitle  = useSelector(state => state.projects.selectedProject.title.stringValue);
  const projectTag = useSelector(state => state.projects.selectedProject.tag.stringValue);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskPriority, setSelectedTaskPriority] = useState(taskPriorityOptions.find(option => option.value === selectedTaskData.priority.stringValue));
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(taskStatusOptions.find(option => option.value === selectedTaskData.status.stringValue));
  
  

  const { 
    register, 
    handleSubmit, 
    reset,
    setValue } = useForm({
    resolver: joiResolver(editTaskSchema),
  });

  const navigateToProjectPage = () => {
    dispatch(closePopup());
  }

  const handleRemoveTask = () => {
    dispatch(logicDeleteTask(selectedTaskId))
      .then(() => dispatch(closePopup({name: 'taskPopup'})))
      .then(()=> dispatch(getTasks()));

  };

 

  const isConfirmationPopupOpen = useSelector(state => state.popup.openedPopups.confirmPopup?.isOpen || false);
  const { confirmPopup: { isOpen: isConfirmPopupOpen } = false } = useSelector(state => state.popup.openedPopups);



  const openConfirmPopupHandler = () => {
    dispatch(openPopup({ name: 'confirmPopup' }));
  };


 
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

  // useEffect(() => {
  //   if (isEditing) {
  //     swipeLeftTween([saveButtonRef.current, cancelButtonRef.current]);
  //     swipeLeftTween(btnsEditModeRef.current)
  //   }
  // }, [isEditing]);

  const onSubmit = (data) => {
    dispatch(updateTask({ taskId: selectedTaskId, newData: data }))
      .then(() => setIsEditing(false))
      .catch((error) => console.log(error));
  };

  const handleSelectChangeStatus = (evt) => {
    const newStatus = evt.target.value;
    dispatch(updateTaskStatus({ id : selectedTaskId, newStatus }));

    setSelectedTaskStatus(newStatus);
    setValue("status", newStatus);
    handleSubmit(onSubmit)();
  };

  const handleSelectChangePriority = (evt) => {
    const reselectedPriority = evt.target.value;
    setSelectedTaskPriority(reselectedPriority);
    setValue("priority", reselectedPriority);
    handleSubmit(onSubmit)();
  };

  const hadleRunEditMode = () => {
    setIsEditing(true);
   
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
          <input  
            {...register("title")} 
            type="text" 
            className={`task__task-title ${isEditing ? 'editable' : ''}`}
            // readOnly={isEditing ? false : true} 
                title={selectedTaskData.title.stringValue}
          />
          <div className='task__data-item task__status'>
            <select
              className={`form__select task__select-status ${isEditing ? 'editable' : ''}`}

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
                {projecTitle}
              </h4>
        </header>
        <section className='task__data-block data-block'>
          <div className='task__data-dates'>
              <span className='task__data-item task__creation-date'>{t('created')}:&nbsp;
                {formateDate(selectedTaskData.createTime)}
              </span>
              {
                  !selectedTaskData.isCompleted.booleanValue ? 
                    <span className='task__metadata-item task__work-time'>{t('in-work')}:&nbsp;
                      {daysCount(selectedTaskData.createTime)}
                    </span>
                   : 
                    <span className='task__metadata-item task__finish-date'>
                      {t('done')}
                    </span>
                  
              }
              
          </div>
              <div className='task__data-item task__priority'>
                {t('priority')}:&nbsp;
                <select
                  className={`form__select task__select-priority ${isEditing ? 'editable' : ''}`}

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
            
           
        </section>
            <textarea 
              readOnly={isEditing ? false : true} 
              {...register("description")}
              className={`task__text task__textarea-item ${isEditing ? 'editable' : ''}`}
              >
            </textarea>
        

            <div className="task__controls">
              {isEditing ? (
                <div ref={btnsEditModeRef}>
                  
                  <button 
                    ref={cancelButtonRef}
                    className="task__controls-btn task-button task__controls-btn_type_cancel" 
                    onClick={() => setIsEditing(false)}>
                    {t('cancel')}
                  </button>
                  <button
                    ref={saveButtonRef}
                    className="task__controls-btn task-button task__controls-btn_type_save"
                    onClick={handleSubmit(onSubmit)}>
                    {t('save')}
                  </button>
                </div>
              ) : (
                <button className="task__controls-btn task-button task__controls-btn_type_edit" onClick={hadleRunEditMode}>
                    {t('edit')}
                </button>
              )}
              <button className="task__controls-btn task-button task__controls-btn_type_delete" onClick={openConfirmPopupHandler}></button>
                
            </div>
      </article>
    </li>
      )}
      
      
      {isConfirmationPopupOpen && <ConfirmPopup agreeHandler={handleRemoveTask}/>}
    </>
  )
}

export default Task