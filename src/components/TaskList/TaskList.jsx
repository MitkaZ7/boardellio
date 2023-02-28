import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from '../TaskCard/TaskCard'
import { db } from '../../utils/firebase'
import { getTasks } from '../../store/slices/tasksSlice'
import Loader from '../Loader/Loader'
import { HTML5Backend } from 'react-dnd-html5-backend'
import  {DndProvider} from 'react-dnd'

const TaskList = () => {
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();


  // const tasks = useSelector(state => state.tasks.tasks);
  const { tasks,isLoad } = useSelector(state => state.tasks);
  useEffect( () => {
    dispatch(getTasks())
    
  }, [])
  

  
  
 
  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading && <Loader />} 
    
    <ul className='taskList'>
      {
        tasks.map((task) => <TaskCard key={task.objectId} title={task.title} priority={task.priority}/>)
      }
     
    </ul>
    </DndProvider>
  )
}

export default TaskList
