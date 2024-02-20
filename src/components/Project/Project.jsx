import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, openCustomPopup } from '../../store/slices/popupSlice';
import { 
  getTasks,
  resetTasksState, 
  toggleQueueVisibility, 
  toggleDevVisibility, 
  toggleDoneVisibility } from '../../store/slices/tasksSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { openProjectsMenu, closeProjectsMenu, setProjetcs } from '../../store/slices/projectsMenuSlice';
import { useTranslation } from 'react-i18next';
import SearchForm from '../SearchForm/SearchForm';
import FoldButton from '../FoldButton/FoldButton';
const Project = () => {
  const { projectId, projectName } = useSelector(state => state.projects.selectedProject);
  const activePopup = useSelector(state => state.popup.activePopup);
  const { tasks } = useSelector(state => state.tasks);
  const isProjectsMenuOpen = useSelector(state => state.projectsMenu.isOpen)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isQueueVisible, 
    isDevVisible, 
    isDoneVisible } = useSelector(state => state.tasks.tasksVisibility);
  const openAddTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'AddTaskPopup');
  };

  const openTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'TaskPopup');
  };
  const handleProjectTitleClick = () => {
    if (!isProjectsMenuOpen) {
 
      // dispatch(setProjects(/* список проектов */));
      dispatch(openProjectsMenu());
    } else {
      
      dispatch(closeProjectsMenu());
    }
  };
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    // Реализовать логику поиска и обновления результатов
    // dispatch(setSearchResult(/* результаты поиска */));
  };


  useEffect(() => {
    dispatch(getTasks());

    return () => {
      dispatch(resetTasksState()); // Очищаем список задач при размонтировании компонента
    };
  }, [projectId, dispatch]);

  

  const closeProjectSearchMenu = (evt) => {
    if (evt.target === evt.currentTarget) {
      console.log('closed menu search')
      dispatch(closeProjectsMenu())
    }
  }
  const handleToggleVisibility = (section) => {
    switch (section) {
      case 'queue':
        dispatch(toggleQueueVisibility());
        console.log('clicked qu')
        break;
      case 'dev':
        dispatch(toggleDevVisibility());
        console.log('clicked de')
        break;
      case 'done':
        dispatch(toggleDoneVisibility());
        console.log('clicked do')
        break;
      default:
        break;
    }
  };
  return (
    <>

      <article className='project'>
        <div className='project__header'>

          <h3 className='project__title' onClick={handleProjectTitleClick}>{projectName}</h3>

          {isProjectsMenuOpen && (
            <SearchForm />

          )}
          <button className='project__button-add-task' onClick={openAddTaskPopupHandler}>
            {t('add-task-form-title')}
          </button>
        </div>
        <section className='project__content'>
          <section className='project__tasks-section project__queue-tasks'>
            <div className="project__task-section-header-wrap">
              <h3 className='project__tasks-section-header'>{t('project-page-queue-section-title')} ({tasks.queue.length})</h3>
              {/* <FoldButton onClick={() => handleToggleVisibility('queue')} /> */}
            </div>
            {isQueueVisible && (
            <div className="project__task-section-content-wrap">
              <TaskList onClick={openTaskPopupHandler} taskStatus="queue" />
            </div>)}
          </section>
          <section className='project__tasks-section project__dev-tasks'>
            <div className="project__task-section-header-wrap">
              <h3 className='project__tasks-section-header'>{t('project-page-dev-section-title')} ({tasks.dev.length})</h3>
              {/* <FoldButton onClick={() => handleToggleVisibility('dev')} /> */}
              {/* <button className="project__task-section-fold-btn"></button> */}
            </div>
            {isDevVisible && (
            <div className="project__task-section-content-wrap">
              <TaskList onClick={openTaskPopupHandler} taskStatus="dev" />
            </div>)}
          </section>
          <section className='project__tasks-section project__done-tasks'>
            <div className="project__task-section-header-wrap">
              <h3 className='project__tasks-section-header'>{t('project-page-done-section-title')} ({tasks.done.length})</h3>
              {/* <FoldButton onClick={() => handleToggleVisibility('done')} /> */}
              {/* <button className="project__task-section-fold-btn"></button> */}
            </div>
            {!isDoneVisible && (
            <div className="project__task-section-content-wrap">
              <TaskList onClick={openTaskPopupHandler} taskStatus="done" />
            </div>)}
          </section>
          {/* <div className="project__task-counters">
            <span>{t('project-page-queue-section-title' )}: {tasks.queue.length}</span>
            <span>{t('project-page-dev-section-title')}: {tasks.dev.length}</span>
            <span>{t('project-page-done-section-title')}: {tasks.done.length}</span>
          </div> */}
        </section>
      </article>
      {activePopup === 'AddTaskPopup' && <AddTaskPopup />}
      {activePopup === 'TaskPopup' && <TaskPopup />}
    </>
  );
};

export default Project;
