import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard/TaskCard';
import { getTasks, updateTaskStatus } from '../../store/slices/tasksSlice';
import Loader from '../Loader/Loader';
import { openCustomPopup } from '../../store/slices/popupSlice';
import { ItemTypes } from '../../utils/constants';

const TaskList = ({ onClick, taskStatus }) => {
  const refs = useRef({});
  const listRef = useRef(); 
  const dispatch = useDispatch();

  const handleDrop = (taskId, newStatus) => {
    console.log('item dropped:', taskId);
    dispatch(updateTaskStatus({ taskId, newStatus }));
  };


  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK_CARD,
    drop: (item) => handleDrop(item.taskId, taskStatus),
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

  const { tasks } = useSelector((state) => state.tasks);
  const filteredTasks = tasks[taskStatus] || [];

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div ref={drop} className="task-list-container">
      {isLoading && <Loader />}
      <ul className="taskList" >
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
    </div>
  );
};

export default TaskList;
