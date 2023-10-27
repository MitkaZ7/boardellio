import React from 'react';
import { useDrag } from 'react-dnd';
import { itemTypes } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { openTaskPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getOneTask, selectTask } from '../../store/slices/tasksSlice';
const TaskCard = ({ title, priority, link, onClick, taskId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openTaskPopupHandler = () => {
    onClick()
    dispatch(selectTask(taskId))
    // navigate(`/tasks/${taskId}`);
    // dispatch(getOneTask(taskId))
    
  };

  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: itemTypes.TASK,
  //   item: { id, status }, // Передаем объект с информацией о задаче
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  return (
    <>
      <li className="task-item" onClick={openTaskPopupHandler}>
        <a href={link} className="task-item__link">
          <span className="task-item__title">{title}</span>
          <span className="task-item__priotiry">{priority}</span>
        </a>
      </li>
    </>
  );
};

export default TaskCard;

