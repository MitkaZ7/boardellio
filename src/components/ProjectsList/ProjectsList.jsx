import React, { useState, useEffect } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
import AddProjectPopup from '../AddProjectPopup/AddProjectPopup'
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/slices/projectSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice'
import Loader from '../Loader/Loader';
const ProjectsList = () => {
  const { projects } = useSelector(state => state.projects);
  const { isLoading } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects())
  }, [])
  


  const [isAddProjectPopupOpen, setIsAddProjectPopupOpen] = useState(false)
  const openPopupHandler = () => {
    setIsAddProjectPopupOpen(true);
  }

  return (
    <>
    {isLoading && <Loader/>}
    <section className="projects-list">
        
      <header className="projects-list__header">  
        <h2 className="projects-list__title">Current projects</h2>
          <button className="projects-list__add-button" onClick={openPopupHandler}>Create project</button>
      </header>
      <ul className="projects-list__list">
   
          
       {
          projects.map((item) => <ProjectCard key={item.objectId} name={item.name} />)
        }

      </ul>
      

    </section>
      <AddProjectPopup isOpen={isAddProjectPopupOpen} setOpen={setIsAddProjectPopupOpen} />
    </>
  )
}

export default ProjectsList
