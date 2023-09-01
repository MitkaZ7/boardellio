import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import { getTasks, updateTaskStatus, setSelectedTaskStatus } from '../../store/slices/tasksSlice';
import Loader from '../Loader/Loader';
import { openTaskPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop } from 'react-dnd';

const TaskList = ({ onTaskClick, taskStatus }) => {
  const { isLoading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
 
  
  const handleTaskClick = (taskId) => {
    onTaskClick(taskId);
  };

  const { tasks } = useSelector((state) => state.tasks);
  const filteredTasks = tasks[taskStatus] || [];
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  

  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading && <Loader />}
      <ul className="taskList">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.taskId}
            title={task.title}
            priority={task.priority}
            status={taskStatus}
            onClick={() => handleTaskClick(task.id)}
          />
        ))}
        {/* {activeTaskId && <TaskPopup taskId={activeTaskId} />} */}
      </ul>
    </DndProvider>
  );
};

export default TaskList;
