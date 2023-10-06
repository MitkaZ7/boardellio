import React, {useEffect} from 'react'
import Popup from '../Popup/Popup'
import Task from '../Task/Task'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { getOneTask, resetSelectedTaskData } from '../../store/slices/tasksSlice';

const TaskPopup = () => {
  const { selectedTaskId } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(resetSelectedTaskData()); // Сброс данных перед загрузкой новой задачи
    dispatch(getOneTask(selectedTaskId));
  }, [dispatch, selectedTaskId]);
  const handleClosePopup = () => {
    dispatch(resetSelectedTaskData()); // Сброс данных задачи при закрытии попапа
    dispatch(closePopup());
  };


  return (
    <Popup onCLose={handleClosePopup}>
      <Task popupData={selectedTaskId}/>
    </Popup>
  )
}

export default TaskPopup