import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { getProjects } from '../../store/slices/projectSlice';
import { createTaskSchema } from '../../utils/validation';
const AddTaskPopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);
  const projects = useSelector((state) => state.projects.projects);
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

  const onClose = () => {
    dispatch(closePopup());
  };

  useEffect(() => {
    const loadProjects = async () => {
      if (isOpen && !isProjectsLoaded) {
        await dispatch(getProjects());
        setIsProjectsLoaded(true);
      }
    };

    loadProjects();
  }, [isOpen, isProjectsLoaded, dispatch]);

  // Рендер попапа только если isOpen === true и список проектов загружен
  if (!isOpen || !isProjectsLoaded) return null; 
  return (
    <Popup>
      <Form projects={projects} validationSchema={createTaskSchema}/>
    </Popup>
  );
};

export default AddTaskPopup;
