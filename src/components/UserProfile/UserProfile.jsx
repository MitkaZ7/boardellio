import React, { useEffect,useState} from 'react'
import { useTranslation } from 'react-i18next'
const avatar = require('../../assets/images/avatar.jpg');
import { useDispatch, useSelector } from 'react-redux';
import { getUserTasks } from '../../store/slices/tasksSlice';
import { getUserProjects, selectProject } from '../../store/slices/projectSlice';
import { getOneTask, selectTask } from '../../store/slices/tasksSlice';
import { openCustomPopup, openPopup } from '../../store/slices/popupSlice';
import TaskPopup from '../TaskPopup/TaskPopup';
import { useNavigate } from 'react-router-dom';
import WithTranslation from '../hoc/WithTranslation';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import AddProjectPopup from '../AddProjectPopup/AddProjectPopup';
import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';

import ButtonEdit from '../ButtonEdit/ButtonEdit';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
const UserProfile = ({t}) => {
  
    const dispatch = useDispatch();
    const { user } = useSelector((state)=> state.user);
    const [userTasks, setUserTasks] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const activePopup = useSelector(state => state.popup.activePopup);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

  const openEditProfilePopupHandler = () => {
    dispatch(openPopup({ name: 'editProfilePopup' }));
  };
  const openAddTaskPopupHandler = () => {
    dispatch(openPopup({ name: 'addTaskPopup' }))
  };
  const openAddProjectPopupHandler = () => {
    dispatch(openPopup({ name: 'addProjectPopup' }));
  };

  const fetchProjects = async () => {
    try {
      const res = await dispatch(getUserProjects(user.email));
      setUserProjects(res.payload);
    } catch (error) {
      console.error('Ошибка при получении проектов пользователя:', error);
    }
  };
  const fetchTasks = async () => {
    try {
      const res = await dispatch(getUserTasks(user.email));
      setUserTasks(res.payload);
    } catch (error) {
      console.error('Ошибка при получении задач пользователя:', error);
    }
  };
  useEffect(() => {
    // fetchTasks();
    // fetchProjects();
  }, []); 

  useEffect(() => {
    // fetchProjects();
  }, [])
  
  

  const openTaskPopupHandler = (id) => {
    dispatch(selectTask(id))
    // dispatch(findTaskById(id));
    // navigate(`/tasks/${taskId}`);
    dispatch(getOneTask(id))
    dispatch(openPopup({ name: 'taskPopup' }))

  };
  const handleProjectClick = (title,id,author,taskQty) => {
    dispatch(selectProject({ title, id, author, taskQty }));
    navigate(`/projects/${title}`);
  };


  return (
    <div className='user-profile'>
      <div className="user-profile__info">
        <div className="user-profile__avatar-wrapper">
          <img src={user.photoUrl} alt="user avatar" className="user-profile__avatar" />
          <button className="user-profile__button-edit-avatar" type="button" ></button>
        </div>
        <div className='user-profile__info-wrapper'>
          <div className='user-profile__info-item'>
            {t('email')}: <span> {user.email}</span> 
          </div>
          <div className='user-profile__info-item' onClick={openEditProfilePopupHandler}>
            {t('name')}: <span>{user.name}</span>
          </div>

          {/* <input
            {...register("name")}
            type="text"
            className={`user-profile__info-item ${isEditing ? 'editable' : ''}`}
            title={selectedTaskData.title.stringValue}
          /> */}
          <div className='user-profile__info-item'>
            {/* {t('role')}: <span>{user.user.role.stringValue}</span> */}
          </div>
          {/* <ButtonEdit className="user-profile__edit-info-btn" /> */}
          <button className="user-profile__edit-info-btn" onClick={openEditProfilePopupHandler}>
            {t('edit')}
          </button>
        </div>
      </div>
      <div className='user-profile__relative-data'>
        <div className="user-profile__relative-data-wrapper">
          

        <div className='user-profile__user-projects'>
            <div className="user-profile__relative-data-header">
              <h3 className='user-profile__relative-data-title'>
                {t('my-created-projects')}
              </h3>
              <ButtonAdd buttonText={t('projects-page-add-btn')} onClick={openAddProjectPopupHandler} />

            </div>
          
          <ol className="user-profile__relative-data-list">
              {userProjects && userProjects.length > 0 ? (
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
              ) : (
                <p className="">{t('no-projects-placeholder')}</p>
              )}

          </ol>
        </div>
        <div className='user-profile__user-tasks'>
          <div className="user-profile__relative-data-header">
            <h3 className='user-profile__relative-data-title'>
              {t('my-created-tasks')}:
            </h3>
            <ButtonAdd buttonText={t('add-task-form-title')} onClick={openAddTaskPopupHandler}/>
          </div>
          <ol className="user-profile__relative-data-list">
              {userProjects && userProjects.length > 0 ? (
                userTasks.map((task) => {
                  return <li key={task.id} id={task.id} onClick={() => openTaskPopupHandler(task.id)}>{task.title.stringValue}</li>
                })
              ) : (
                <p className="">{t('no-tasks-placeholder')}</p>
              )
              
              
              }
                
              
          </ol>
        </div>
      </div>
      </div>
      <TaskPopup />
      <AddTaskPopup/>
      <AddProjectPopup />
      <EditProfilePopup userName={user.name}/>
    </div>
  )
}

export default WithTranslation(UserProfile);