import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from '../TaskCard/TaskCard'
import { getTasks } from '../../store/slices/tasksSlice'
import Loader from '../Loader/Loader'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import { openTaskPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup'


const TaskList = ({ onTaskClick, taskStatus }) => {
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const [activeTaskId, setActiveTaskId] = useState(null);
  const handleTaskClick = (taskId) => {
    onTaskClick(taskId);
  };



  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getTasks());
    console.log(tasks)
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
        {activeTaskId && <TaskPopup taskId={activeTaskId} />} {/* Рендеринг попапа только при наличии активного taskId */}
      </ul>
    </DndProvider>
  )
}

export default TaskList
