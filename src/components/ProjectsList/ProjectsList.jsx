import React, { useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import AddProjectPopup from '../AddProjectPopup/AddProjectPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/slices/projectSlice';
import { openPopup } from '../../store/slices/popupSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WithTranslation from '../hoc/WithTranslation';
import ButtonAdd from '../ButtonAdd/ButtonAdd';

const ProjectsList = ({t}) => {
  const { projects, isLoad } = useSelector(state => state.projects);
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortedProjects = [...projects].sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
  useEffect(() => {
      dispatch(getProjects());
  }, []);

  const openPopupHandler = () => {

    dispatch(openPopup({ name: 'addProjectPopup' }));

  };



  return (
    <>
      
      <section className="projects-list">
        <header className="projects-list__header">
          <h2 className="projects-list__title">{t('projects-page-title')}</h2>
          <ButtonAdd buttonText={t('projects-page-add-btn')} onClick={openPopupHandler} />
        </header>

        <ul className="projects-list__list">
          { 
            sortedProjects.map((projectItem) => 
              
              <ProjectCard 
                key={projectItem.id} 
                title={projectItem.title.stringValue} 
                id={projectItem.id} 
                author={projectItem.author.stringValue}
                taskQty={projectItem.taskQty.integerValue}
              />
            )
          }
          
        </ul>
      </section>
      <AddProjectPopup />
    </>
  );

};

export default WithTranslation(ProjectsList);
