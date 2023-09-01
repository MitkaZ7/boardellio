import React from 'react'
import { useDispatch } from 'react-redux';
import { removeTask } from '../../store/slices/tasksSlice';
const Task = ({ taskId, title, status }) => {
  const dispatch = useDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTask(taskId));
  };
  return (
    <li className='task'>
      <article className='task__content'>
        <h3 className='task__header'>Do the project</h3>
        <section className='task__metadata'>
          <div className='task__metadata-parametres'>
            <span className='task__metadata-item task__number'>Number: 1</span>
            <span className='task__metadata-item task__status'>Status: dev</span>
            <span className='task__metadata-item task__priority'>Proirity: seriuosly</span>
          </div>
          <div className='task__metadata-dates'>
            <span className='task__metadata-item task__creation-date'>Created: 27-11-2022</span>
            <span className='task__metadata-item task__spent-time'>In work for: 1 day</span>
            <span className='task__metadata-item task__finish-date'>Done: 02-12-2022</span>
          </div>
        </section>
        <p className='task__text'>
          Dont let your dreams be dreams.
          Yesterday you said tomorrow. So just do it! Make your dreams come true. Just do it. Some people dream of success,
          while you’re going to wake up and work hard at it. Nothing is impossible… You should get to the point where anyone else would quit and you’re not going to stop there.
          NO! What are you waiting for?! DO IT! JUST DO IT! YES YOU CAN! JUST DO IT! If you are tired of starting over, stop giving up.
        </p>

        <section className='task__subtasks subtasks'>
          <ul className='subtasks__list'>
            {/* <Subtask/> */}
          </ul>
        </section>
        <section className='task__files'>

          <input type='file' id='file' name='file' multiple />
        </section>
        <section className='task__comments comments'>
          <ul className='comments__list'>
            {/* <CommentItem /> */}
          </ul>
        </section>
        <button onClick={handleRemoveTask}>Remove task</button>
      </article>
    </li>
  )
}

export default Task