import React, { useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import AddProjectPopup from '../AddProjectPopup/AddProjectPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectProject } from '../../store/slices/projectSlice';
import { openPopup } from '../../store/slices/popupSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
  const { projects } = useSelector(state => state.projects);
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProjects());

  }, [dispatch]);

  const popupProps = {
    name: 'addProject',
    isOpen: false,
  };

  const openPopupHandler = () => {
    dispatch(openPopup(popupProps));
  };

  // Проверяем, что projects - это массив перед его использованием
  // if (!Array.isArray(projects) || projects.length === 0) {
  //   return null;
  // }

  return (
    <>
      {isLoading && <Loader />}
      <section className="projects-list">
        <header className="projects-list__header">
          <h2 className="projects-list__title">Current projects</h2>
          <button className="projects-list__add-button" onClick={openPopupHandler}>
            Create project
          </button>
        </header>
        <ul className="projects-list__list">
          {Object.entries(projects).map(([projectId, projectData]) => (
            <ProjectCard key={projectId} projectName={projectData.title} projectId={projectId} />
          ))}
        </ul>
      </section>
      <AddProjectPopup />
    </>
  );
};

export default ProjectsList;
