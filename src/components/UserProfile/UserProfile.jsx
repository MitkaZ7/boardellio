import React, { useEffect,useState} from 'react'
import { useTranslation } from 'react-i18next'
const avatar = require('../../assets/images/avatar.jpg');
import { useDispatch, useSelector } from 'react-redux';
import { getUserTasks } from '../../store/slices/tasksSlice';
import { getUserProjects, selectProject } from '../../store/slices/projectSlice';
import { getOneTask, selectTask } from '../../store/slices/tasksSlice';
import { openCustomPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useSelector((state)=> state.user);
    const [userTasks, setUserTasks] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const activePopup = useSelector(state => state.popup.activePopup);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await dispatch(getUserTasks(user.email));
        setUserTasks(res.payload);
      } catch (error) {
        console.error('Ошибка при получении задач пользователя:', error);
      }
    };
    // dispatch(getUserProjects(user.email))
    const fetchProjects = async () => {
      try {
        const res = await dispatch(getUserProjects(user.email));
        setUserProjects(res.payload);
      } catch (error) {
        console.error('Ошибка при получении проектов пользователя:', error);
      }
    };

    fetchTasks();
    fetchProjects();

  }, [dispatch]); 

  const openTaskPopupHandler = (id) => {
    console.log(id)
    dispatch(selectTask(id))
    openCustomPopup(dispatch, 'TaskPopup');
    // navigate(`/tasks/${taskId}`);
    // dispatch(getOneTask(id))
    // console.log(selectedTaskData)

  };
  const handleProjectClick = (title,id,author,taskQty) => {
    dispatch(selectProject({ title, id, author, taskQty }));
    navigate(`/projects/${title}`);
  };


  return (
    <div className='user-profile'>
      <div className="user-profile__info">
        <div className="user-profile__avatar-wrapper">
          <img src={avatar} alt="user avatar" className="user-profile__avatar" />
          <button className="user-profile__button-edit-avatar" type="button" ></button>
        </div>
        <div className='user-profile__info-wrapper'>
          <div className='user-profile__info-item'>
            {t('email')}: <span> {user.email}</span> 
          </div>
          <div className='user-profile__info-item'>
            {t('name')}: <span> Jhon Travolta</span>
          </div>
          <div className='user-profile__info-item'>
            {t('role')}:
            <span> user</span>
          </div>
          <button className="user-profile__edit-info-btn">
            {t('edit')}
          </button>
        </div>
      </div>
      <div className='user-profile__relative-data'>
        <div className="user-profile__relative-data-wrapper">
        <div className='user-profile__user-projects'>
          <h3 className='user-profile__relative-data-header'>
            {t('my-created-projects')}:
          </h3>
          <ol className="user-profile__relative-data-list">
            {
              userProjects.map((project) => {
                return <li 
                key={project.id} 
                id={project.id}
                title={project.title.stringValue}
              
                  onClick={() => handleProjectClick(
                    project.title.stringValue,
                    project.id,
                    project.author.stringValue,
                    project.taskQty.integerValue,
                    )}
                >
                {project.title.stringValue}
                </li>
              })
            }
          </ol>
        </div>
        <div className='user-profile__user-tasks'>
          <h3 className='user-profile__relative-data-header'>
            {t('my-created-tasks')}:
          </h3>
          <ol className="user-profile__relative-data-list">
              {
                userTasks.map((task)=> {
                  return <li key={task.id} id={task.id} onClick={() => openTaskPopupHandler(task.id)}>{task.title.stringValue}</li>
                })
              }
          </ol>
        </div>
      </div>
      </div>
      {activePopup === 'TaskPopup' && <TaskPopup />}
    </div>
  )
}

export default UserProfile