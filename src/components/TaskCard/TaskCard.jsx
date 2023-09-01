import React from 'react';
import { useDrag } from 'react-dnd';
import { itemTypes } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { openTaskPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { Link } from 'react-router-dom';
import { getOneTask } from '../../store/slices/tasksSlice';
const TaskCard = ({ title, priority, link, taskId, status, onClick }) => {
  const dispatch = useDispatch();
  // const openTaskPopupHandler = () => {
  //   dispatch(getOneTask(taskId))
  //   dispatch(openTaskPopup(taskId));
  // };

  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: itemTypes.TASK,
  //   item: { id, status }, // Передаем объект с информацией о задаче
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  return (
    <>
      <li className="task-item" onClick={onClick}>
        <a href={link} className="task-item__link">
          <span className="task-item__title">{title}</span>
          <span className="task-item__priotiry">{priority}</span>
        </a>
      </li>
    </>
  );
};

export default TaskCard;

