import React from 'react'
import { useDrag } from 'react-dnd'
const TaskCard = ({title, priority, link}) => {
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
   
      <li className="task-item">
      <a href={link} className="task-item__link">
        <span className="task-item__title">{title}</span>
        <span className="task-item__priotiry">{priority}</span>
        </a>
      </li>
     
  )
}

export default TaskCard
