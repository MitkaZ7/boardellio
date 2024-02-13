import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard/TaskCard';
import { getTasks, updateTaskStatus } from '../../store/slices/tasksSlice';
import Loader from '../Loader/Loader';
import { openCustomPopup } from '../../store/slices/popupSlice';
import { ItemTypes } from '../../utils/constants';

const TaskList = ({ onClick, taskStatus }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const filteredTasks = tasks[taskStatus] || [];
  
  const refs = useRef({});
  const dispatch = useDispatch();

  const handleDrop = (taskId, newStatus) => {
    // console.log('item dropped:', taskId);
    dispatch(updateTaskStatus({ taskId, newStatus, taskStatus }));
  };


  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK_CARD,
    drop: (item) => handleDrop(item.taskId, taskStatus, item.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const { isLoading } = useSelector((state) => state.loader);
  const { selectedTaskId } = useSelector((state) => state.tasks);

  const openTaskPopupHandler = () => {
    openCustomPopup(dispatch, 'TaskPopup');
  };

  const handleTaskClick = () => {
    openTaskPopupHandler(selectedTaskId);
    onClick();
  };

 

  useEffect(() => {
  if (!tasks[taskStatus]) {
    dispatch(getTasks());
  }
}, [dispatch, tasks, taskStatus]);

useEffect(() => {
  // console.log('Tasks updated:', tasks);
}, [tasks, taskStatus, filteredTasks]);

  return (
    <>
      {isLoading && <Loader />}
      <ul className={`taskList ${isOver ? 'drag-over' : ''}`} ref={drop}>
        {filteredTasks.map((task) => (
          <TaskCard
          
            key={task.taskId}
            title={task.title}
            priority={task.priority}
            status={taskStatus}
            taskId={task.taskId}
            onClick={handleTaskClick}
            ref={(element) => {
              refs[task.taskId] = element;
            }}
          />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
