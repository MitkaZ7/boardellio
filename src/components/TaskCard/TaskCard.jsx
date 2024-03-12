import React, { useEffect, forwardRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch,useSelector } from 'react-redux';
import { openPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getOneTask, selectTask, findTaskById } from '../../store/slices/tasksSlice';
import { ItemTypes } from '../../utils/constants';



const TaskCard = forwardRef(({ title, priority, link, id, status }, ref) => {
  const { selectedTaskData } = useSelector(state => state.tasks);

 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openTaskPopupHandler = () => {
    dispatch(selectTask(id))
    // dispatch(findTaskById(id));
    // navigate(`/tasks/${taskId}`);
    dispatch(getOneTask(id))
    dispatch(openPopup({ name: 'taskPopup' }))

  };

    //
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK_CARD,
    item: { id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
    <li 
      className={`task-item ${isDragging ? 'dragging' : ''}`}
      onClick={!isDragging ? openTaskPopupHandler : null}
      ref={(element) => {
        ref(element);
        drag(element);
      }}
      >
        <a href={link} className="task-item__link">
          <span className="task-item__title" title={title}>{title}</span>
          <span className="task-item__priotiry">{priority}</span>
        </a>
      </li>
      {selectedTaskData && <TaskPopup />}
    </>
   
  );
});

export default TaskCard;

