import React from 'react'
import { useDrag } from 'react-dnd'
import TaskPopup from '../TaskPopup/TaskPopup'
import { openTaskPopup } from '../../store/slices/popupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const TaskCard = ({ title, priority, link, id }) => {
  const dispatch = useDispatch();
  const openTaskPopupHandler = () => {
    dispatch(openTaskPopup(id));
  }


  const itemTypes = {
    TASK: 'task'
  }
  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.TASK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <>
   
      <li className="task-item" onClick={openTaskPopupHandler}>
        <a href={link} className="task-item__link" >
          <span className="task-item__title">{title}</span>
          <span className="task-item__priotiry">{priority}</span>
        </a>
        
      </li>
      <TaskPopup/>
      
    </>
     
  )
}

export default TaskCard
