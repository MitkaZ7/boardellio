import React, { useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import AddProjectPopup from '../AddProjectPopup/AddProjectPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/slices/projectSlice';
import { openCustomPopup } from '../../store/slices/popupSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
  const { projects, isLoad } = useSelector(state => state.projects);
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(getProjects());
  }, []);

  const openPopupHandler = () => {
    openCustomPopup(dispatch, 'addProjectPopup')
  };



  return (
    <>
      
      <section className="projects-list">
        <header className="projects-list__header">
          <h2 className="projects-list__title">Current projects</h2>
          <button className="projects-list__add-button" onClick={openPopupHandler}>
            Create project
          </button>
        </header>

        <ul className="projects-list__list">
          { 
            projects?.map((projectItem) => <ProjectCard key={projectItem.id} projectName={projectItem.title} projectId={projectItem.id} />)
          }
          

          {/* {Object.entries(projects).map(([projectId, projectData]) => (
            <ProjectCard key={projectId} projectName={projectData.title} projectId={projectId} />
          ))} */}
        </ul>
      </section>
      <AddProjectPopup />
    </>
  );

};

export default ProjectsList;
