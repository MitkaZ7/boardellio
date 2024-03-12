import React, {useEffect} from 'react'
import Popup from '../Popup/Popup'
import Task from '../Task/Task'
import { useSelector } from 'react-redux';

const TaskPopup = () => {
  const { selectedTaskId, selectedTaskData } = useSelector(state => state.tasks);
  const { taskPopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);

  return (
    <>
      {selectedTaskData && (
        <Popup popupName={'taskPopup'} isOpen={isOpen}>
          <Task taskId={selectedTaskId} />
        </Popup>
      )}
    
    </>
  )
}

export default TaskPopup