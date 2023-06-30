import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import AddProjectPopup from '../AddProjectPopup/AddProjectPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/slices/projectSlice';
import { openPopup } from '../../store/slices/popupSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';

const ProjectsList = () => {
  const { projects } = useSelector(state => state.projects);
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const { } = useParams();

  const popupProps = {
    name: 'addProject',
    isOpen: false,
  };

  const openPopupHandler = () => {
    dispatch(openPopup(popupProps));
  };
  if (!Array.isArray(projects)) {
    console.log('null')
    return null; // или другой код обработки, если projects не является массивом
  }
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

          {projects?.map((item) => (
            <Link to={`/projects/${item?.objectId}`}>
              <ProjectCard key={item?.objectId} name={item?.name} />
            </Link>
          ))}


        </ul>
      </section>
      <AddProjectPopup />
    </>
  );
};

export default ProjectsList;
