// ProjectCard.jsx
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProject } from '../../store/slices/projectSlice';

const ProjectCard = ({ projectName, projectId, projectAuthor, projectTaskQty }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleProjectClick = () => {
    dispatch(selectProject({ projectName, projectId, projectAuthor, projectTaskQty }));
    navigate(`/projects/${projectName}`);
  };

  return (
    <li className="project-card" onClick={handleProjectClick}>
      <p className="project-card__link">{projectName}</p>
    </li>
  );
};

export default ProjectCard;
