import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import { getTasks, updateTaskStatus, setSelectedTaskStatus } from '../../store/slices/tasksSlice';
import Loader from '../Loader/Loader';
import { openTaskPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop } from 'react-dnd';

const TaskList = forwardRef(({ onTaskClick, taskStatus }, ref) => {
  const { isLoading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [activeTaskId, setActiveTaskId] = useState(null);
  
  const handleTaskClick = (taskId) => {
    onTaskClick(taskId);
  };

  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const filteredTasks = tasks[taskStatus] || [];
 



  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading && <Loader />}
      <ul className="taskList">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.objectId}
            title={task.title}
            priority={task.priority}
            status={taskStatus}
            onClick={() => handleTaskClick(task.id)}
          />
        ))}
        {activeTaskId && <TaskPopup taskId={activeTaskId} />}
      </ul>
    </DndProvider>
  );
});

export default TaskList;
