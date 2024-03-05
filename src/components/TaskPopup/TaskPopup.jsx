import React, {useEffect} from 'react'
import Popup from '../Popup/Popup'
import Task from '../Task/Task'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { getOneTask } from '../../store/slices/tasksSlice';

const TaskPopup = () => {
  const { selectedTaskId, selectedTaskData } = useSelector(state => state.tasks);
  const { taskPopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOneTask(selectedTaskId));
  }, [dispatch, selectedTaskId]);

  return (
    <>
      {selectedTaskData && (
        <Popup  popupName={'taskPopup'} isOpen={isOpen}>
        <Task taskId={selectedTaskId} />
      </Popup>
      )}
    
    </>
  )
}

export default TaskPopup