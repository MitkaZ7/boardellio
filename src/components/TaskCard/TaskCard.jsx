import React from 'react';
import { useDrag } from 'react-dnd';
import { itemTypes } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { openTaskPopup } from '../../store/slices/popupSlice';
import { Link } from 'react-router-dom';

const TaskCard = ({ title, priority, link, id, status }) => {
  const dispatch = useDispatch();
  const openTaskPopupHandler = () => {
    dispatch(openTaskPopup(id));
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.TASK,
    item: { id, status }, // Передаем объект с информацией о задаче
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <li className="task-item" ref={drag} onClick={openTaskPopupHandler}>
        <a href={link} className="task-item__link">
          <span className="task-item__title">{title}</span>
          <span className="task-item__priotiry">{priority}</span>
        </a>
      </li>
    </>
  );
};

export default TaskCard;

