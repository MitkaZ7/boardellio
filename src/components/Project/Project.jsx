import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, openCustomPopup } from '../../store/slices/popupSlice';
import { useParams } from 'react-router-dom';
import { getTasks,updateTaskStatus } from '../../store/slices/tasksSlice';
import { selectProject } from '../../store/slices/projectSlice';
import { DndProvider,useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskPopup from '../TaskPopup/TaskPopup';
import { itemTypes } from '../../utils/constants';
import { useLocation } from 'react-router-dom';


const Project = () => {
  const { projectId, projectName } = useSelector(state => state.projects.selectedProject);
  const activePopup = useSelector(state => state.popup.activePopup);
  // const { selectedTaskId } = useSelector(state => state.popup);
  // const { activeTaskId, selectedTaskStatus } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const openAddTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'AddTaskPopup');
  };
  const openTaskPopupHandler = (taskId) => {
    const popupData = { someKey: 'someValue' };
    openCustomPopup(dispatch, 'TaskPopup', popupData);
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
  }, [projectId, dispatch]);
  
  // const handleTaskDrop = (taskId, newStatus) => {
  //   dispatch(updateTaskStatus({ taskId, previousStatus: selectedTaskStatus, newStatus }));
  // };

  // const [, queueDrop] = useDrop({
  //   accept: itemTypes.TASK,
  //   drop: (item) => handleTaskDrop(item.id, 'queue'), // Перетаскивание в секцию "queue"
  // });

  // const [, devDrop] = useDrop({
  //   accept: itemTypes.TASK,
  //   drop: (item) => handleTaskDrop(item.id, 'dev'), // Перетаскивание в секцию "dev"
  // });

  // const [, doneDrop] = useDrop({
  //   accept: itemTypes.TASK,
  //   drop: (item) => handleTaskDrop(item.id, 'done'), // Перетаскивание в секцию "done"
  // });
  

  return (
    <DndProvider backend={HTML5Backend}>
      <article className='project'>
        <div className='project__header'>
          <h3 className='project__title'>{projectName}</h3>
          <button className='project__button-add-task' onClick={openAddTaskPopupHandler}>
            add task
          </button>
        </div>
        <section className='project__content'>
          <section className='project__tasks-section project__queue-tasks'>
            <h3 className='project__tasks-section-header'>queue</h3>
            <TaskList onClick={openTaskPopupHandler} taskStatus="queue" />
          </section>
          <section className='project__tasks-section project__dev-tasks'>
            <h3 className='project__tasks-section-header'>development</h3>
            <TaskList onClick={openTaskPopupHandler} taskStatus="dev" />
          </section>
          <section className='project__tasks-section project__done-tasks'>
            <h3 className='project__tasks-section-header'>done</h3>
            <TaskList onClick={openTaskPopupHandler} taskStatus="done" />
          </section>
        </section>
      </article>
      {/* {selectedTaskId && <TaskPopup taskId={selectedTaskId} />} */}
      {activePopup === 'AddTaskPopup' && <AddTaskPopup />}
      {activePopup === 'TaskPopup' && <TaskPopup />}
    </DndProvider>
  );
};

export default Project;
