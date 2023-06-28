import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, openTaskPopup } from '../../store/slices/popupSlice';

const Project = () => {
  const dispatch = useDispatch();

  const openPopupHandler = () => {
    dispatch(openPopup({ isOpen: true }));
  };
  const openTaskPopupHandler = (taskId) => {
    dispatch(openTaskPopup(taskId));
  };

 
  return (
    <>
      <article className='project'>
        <div className='project__header'>
          <h3 className='project__title'>Project: Single page application "Dashboard"</h3>
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
      <AddTaskPopup />
    </>
  );
};

export default Project;
