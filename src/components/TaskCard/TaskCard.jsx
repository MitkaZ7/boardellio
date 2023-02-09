import React from 'react'

const TaskCard = ({title, priority, link}) => {
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
