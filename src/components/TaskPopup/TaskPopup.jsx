import React, {useEffect} from 'react'
import Popup from '../Popup/Popup'
import Task from '../Task/Task'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { getOneTask } from '../../store/slices/tasksSlice';

const TaskPopup = () => {
  const { selectedTaskId } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOneTask(selectedTaskId));
  }, [dispatch, selectedTaskId]);
  
  const handleClosePopup = () => {
    dispatch(closePopup());

  };

  return (
    <Popup onCLose={handleClosePopup}>
      <Task taskId={selectedTaskId}/>
    </Popup>
  )
}

export default TaskPopup