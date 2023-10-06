import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import { getTasks, updateTaskStatus, setSelectedTaskStatus, getOneTask } from '../../store/slices/tasksSlice';
import Loader from '../Loader/Loader';
import { openCustomPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop } from 'react-dnd';

const TaskList = ({ onClick, taskStatus }) => {
  const { isLoading } = useSelector((state) => state.loader);
  const { selectedTaskId } = useSelector(state => state.tasks)
  const dispatch = useDispatch();
  const openTaskPopupHandler = () => {
    // const popupData = { someKey: 'someValue' }; // Дополнительные данные, если нужны
    openCustomPopup(dispatch, 'TaskPopup');
    // dispatch(getOneTask(selectedTaskId))
  };
  
  const handleTaskClick = () => {
    openTaskPopupHandler(selectedTaskId);
    onClick()
   
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
            taskId={task.taskId}
            onClick={handleTaskClick}
          />
        ))}
        {/* {activeTaskId && <TaskPopup taskId={activeTaskId} />} */}
      </ul>
    </DndProvider>
  );
};

export default TaskList;
