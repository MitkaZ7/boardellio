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
import { useTranslation } from 'react-i18next';
const ProjectsList = () => {
  const { projects, isLoad } = useSelector(state => state.projects);
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
          <button className="projects-list__add-button" onClick={openPopupHandler}>
            {t('projects-page-add-btn')}
          </button>
        </header>

        <ul className="projects-list__list">
          { 
            projects?.map((projectItem) => 
              
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

export default ProjectsList;
