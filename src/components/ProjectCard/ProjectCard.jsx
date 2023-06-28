import React from 'react'

const ProjectCard = ({name, link}) => {
  return (
      <li className="project-card">
      {/* <a href={link} className="project-card__link">{name}</a> */}
      <p className="project-card__link">{name}</p>
      </li>
  )
}

export default ProjectCard