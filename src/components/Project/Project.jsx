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
import { openProjectsMenu, closeProjectsMenu, setProjetcs } from '../../store/slices/projectsMenuSlice';
import { useTranslation } from 'react-i18next';
import SearchForm from '../SearchForm/SearchForm';
const Project = () => {
  const { projectId, projectName } = useSelector(state => state.projects.selectedProject);
  const { projects } = useSelector(state => state.projects);
  const activePopup = useSelector(state => state.popup.activePopup);
  const { tasks } = useSelector(state => state.tasks);
  const isProjectsMenuOpen = useSelector(state => state.projectsMenu.isOpen)
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openAddTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'AddTaskPopup');
  };

  const openTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'TaskPopup');
  };
  const handleProjectTitleClick = () => {
    console.log('pr title clicked')
    if (!isProjectsMenuOpen) {
      // Если меню не открыто, обновите список проектов и откройте меню
      // dispatch(setProjects(/* ваш список проектов */));
      dispatch(openProjectsMenu());
    } else {
      // Если меню открыто, закройте его
      dispatch(closeProjectsMenu());
    }
  };
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    // Реализуйте логику поиска и обновления результатов
    // dispatch(setSearchResult(/* результаты поиска */));
  };


  useEffect(() => {
    if (!projectId) {
      const storedSelectedProject = localStorage.getItem('selectedProject');
      if (storedSelectedProject) {
        const { projectId, projectName } = JSON.parse(storedSelectedProject);
        dispatch(selectProject({ projectId, projectName }));
      }
    }
    dispatch(getTasks());
    console.log(isProjectsMenuOpen)
  }, [projectId, dispatch]);

  // useEffect(() => {
  //   console.log('Projects in Redux Store: ', projects);
  // }, []);  
  const closeProjectSearchMenu = (evt) => {
    if (evt.target === evt.currentTarget) {
      console.log('clilll')
      dispatch(closeProjectsMenu())
    }
  }
  return (
    <>
      
      <article className='project'>
        <div className='project__header'>
        
            <h3 className='project__title' onClick={handleProjectTitleClick}>{projectName}</h3>
     
          {isProjectsMenuOpen && (
            <SearchForm />
          
          )}
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
