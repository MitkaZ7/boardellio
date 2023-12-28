import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, openCustomPopup } from '../../store/slices/popupSlice';
import { getTasks, updateTaskStatus, getOneTask} from '../../store/slices/tasksSlice';
import { selectProject } from '../../store/slices/projectSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskPopup from '../TaskPopup/TaskPopup';

import { useTranslation } from 'react-i18next';

const Project = () => {
  const { projectId, projectName } = useSelector(state => state.projects.selectedProject);
  const activePopup = useSelector(state => state.popup.activePopup);
  const { tasks } = useSelector((state) => state.tasks);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openAddTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'AddTaskPopup');
  };

  const openTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'TaskPopup');
  };



  useEffect(() => {
    console.log('useEffect in Project component is called');
    if (!projectId) {
      const storedSelectedProject = localStorage.getItem('selectedProject');
      if (storedSelectedProject) {
        const { projectId, projectName } = JSON.parse(storedSelectedProject);
        dispatch(selectProject({ projectId, projectName }));
      }
    }
    dispatch(getTasks());
  }, [projectId, dispatch]);

  useEffect(() => {
    console.log('Tasks in Redux Store updated:', tasks);
  }, [tasks]);  

  return (
    <>
      <article className='project'>
        <div className='project__header'>
          <h3 className='project__title'>{projectName}</h3>
          <button className='project__button-add-task' onClick={openAddTaskPopupHandler}>
            add task
          </button>
        </div>
        <section className='project__content'>
          <section className='project__tasks-section project__queue-tasks'>
            <h3 className='project__tasks-section-header'>{t('project-page-queue-section-title')}</h3>
            <TaskList onClick={openTaskPopupHandler} taskStatus="queue" />
          </section>
          <section className='project__tasks-section project__dev-tasks'>
            <h3 className='project__tasks-section-header'>{t('project-page-dev-section-title')}</h3>
            <TaskList onClick={openTaskPopupHandler} taskStatus="dev" />
          </section>
          <section className='project__tasks-section project__done-tasks'>
            <h3 className='project__tasks-section-header'>{t('project-page-done-section-title')}</h3>
            <TaskList onClick={openTaskPopupHandler} taskStatus="done" />
          </section>
        </section>
      </article>
      {activePopup === 'AddTaskPopup' && <AddTaskPopup />}
      {activePopup === 'TaskPopup' && <TaskPopup />}
    </>
  );
};

export default Project;
