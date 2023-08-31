import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, openTaskPopup } from '../../store/slices/popupSlice';
import { useParams } from 'react-router-dom';
import { getTasks,updateTaskStatus } from '../../store/slices/tasksSlice';
import { selectProject } from '../../store/slices/projectSlice';
import { DndProvider,useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskPopup from '../TaskPopup/TaskPopup';
import { itemTypes } from '../../utils/constants';


const Project = ({ projectTitle }) => {
  const params = useParams();
  const current = params.projectTitle;
  const { selectedProjectId } = useSelector(state => state.projects);
  const { selectedTaskId } = useSelector(state => state.popup);
  // const { activeTaskId, selectedTaskStatus } = useSelector(state => state.tasks);

  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log('Project ID:', id);
  const openPopupHandler = () => {
    dispatch(openPopup({ isOpen: true }));
  };
  const openTaskPopupHandler = (taskId) => {
    dispatch(openTaskPopup(taskId));
  };
  useEffect(() => {
 
    if (!selectedProjectId) {
      const storedSelectedProjectId = localStorage.getItem('selectedProjectId');
      if (storedSelectedProjectId) {
        dispatch(selectProject(storedSelectedProjectId));
      }
    }
    dispatch(getTasks());
  }, [id, selectedProjectId, dispatch]);
  // const handleTaskDrop = (taskId, newStatus) => {
  //   dispatch(updateTaskStatus({ taskId, previousStatus: selectedTaskStatus, newStatus }));
  // };
  // useEffect(() => {
  //   if (!selectedProjectId) {
  //     const storedSelectedProjectId = localStorage.getItem('selectedProjectId');
  //     if (storedSelectedProjectId) {
  //       dispatch(selectProject(storedSelectedProjectId));
  //     }
  //   }
  //   dispatch(getTasks());
  // }, [id, selectedProjectId, dispatch]);
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
          <h3 className='project__title'>{projectTitle}</h3>
          <button className='project__button-add-task' onClick={openPopupHandler}>
            add task
          </button>
        </div>
        <section className='project__content'>
          <section className='project__tasks-section project__queue-tasks'>
            <h3 className='project__tasks-section-header'>queue</h3>
            <TaskList onTaskClick={openTaskPopupHandler} taskStatus="queue" />
          </section>
          <section className='project__tasks-section project__dev-tasks'>
            <h3 className='project__tasks-section-header'>development</h3>
            <TaskList onTaskClick={openTaskPopupHandler} taskStatus="dev" />
          </section>
          <section className='project__tasks-section project__done-tasks'>
            <h3 className='project__tasks-section-header'>done</h3>
            <TaskList onTaskClick={openTaskPopupHandler} taskStatus="done" />
          </section>
        </section>
      </article>
      {/* {selectedTaskId && <TaskPopup taskId={selectedTaskId} />} */}
      <AddTaskPopup />
    </DndProvider>
  );
};

export default Project;
