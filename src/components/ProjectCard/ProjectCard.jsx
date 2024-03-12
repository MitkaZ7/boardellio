// ProjectCard.jsx
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProject, getOneProject } from '../../store/slices/projectSlice';
import { linkNameCreate } from '../../utils/linkNameCreate'
const ProjectCard = ({ title, id, author, taskQty }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleProjectClick = () => {
    dispatch(selectProject({ title, id, author, taskQty }));
    navigate(`/projects/${linkNameCreate(title)}`);
  };

  return (
    <li className="project-card" onClick={handleProjectClick}>
      <p className="project-card__link">{title}</p>
    </li>
  );
};

export default ProjectCard;
