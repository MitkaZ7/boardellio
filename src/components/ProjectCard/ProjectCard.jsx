// ProjectCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProject } from '../../store/slices/projectSlice';

const ProjectCard = ({ name, link, projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProjectClick = () => {
    dispatch(selectProject(projectId));
    navigate(`/projects/${projectId}`);
  };

  return (
    <li className="project-card" onClick={handleProjectClick}>
      <p className="project-card__link">{name}</p>
    </li>
  );
};

export default ProjectCard;
