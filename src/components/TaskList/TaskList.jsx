import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard/TaskCard';
import { getTasks, updateTaskStatus, selectTask } from '../../store/slices/tasksSlice';
import Loader from '../Loader/Loader';
import { openCustomPopup } from '../../store/slices/popupSlice';
import { ItemTypes } from '../../utils/constants';

const TaskList = ({ onClick, taskStatus }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const filteredTasks = tasks[taskStatus] || [];
  const [isDragging, setIsDragging] = useState(false);
  const refs = useRef({});
  const dispatch = useDispatch();
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  const handleDrop = (id, newStatus) => {
    // console.log('item dropped:', taskId);
    dispatch(updateTaskStatus({ id, newStatus, taskStatus }));
  };


  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK_CARD,
    drop: (item) => {
      console.log(item); // Выводит содержимое объекта item в консоль
      handleDrop(item.id, taskStatus, item.status.stringValue);
    },
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
    dispatch(selectTask(selectedTaskId))
    onClick();
  };



  useEffect(() => {
    if (!tasks[taskStatus]) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks, taskStatus]);

  // useEffect(() => {
  //   console.log('Tasks updated:', tasks);
  // }, [tasks, taskStatus, filteredTasks]);

  return (
    <>
      {isLoading && <Loader />}
      <ul className={`taskList ${isOver || isDragging ? 'drag-over' : ''}`} ref={drop} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title.stringValue}
            priority={task.priority.stringValue}
            status={taskStatus}
            id={task.id}
            onClick={handleTaskClick}
            ref={(element) => {
              refs[task.id] = element;
            }}
          />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
