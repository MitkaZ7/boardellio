// ProjectCard.jsx
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProject } from '../../store/slices/projectSlice';

const ProjectCard = ({ projectName, link, projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleProjectClick = () => {
    dispatch(selectProject({projectName, projectId}));
    navigate(`/projects/${projectName}`);
  };

  return (
    <li className="project-card" onClick={handleProjectClick}>
      <p className="project-card__link">{projectName}</p>
    </li>
  );
};

export default ProjectCard;
