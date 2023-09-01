import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { getProjects } from '../../store/slices/projectSlice';

const AddTaskPopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);
  const projects = useSelector((state) => state.projects.projects);
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

  const onClose = () => {
    dispatch(closePopup());
  };

  useEffect(() => {
    // if (isOpen && projects.length) {
      
    //   // Если попап открывается и список проектов еще не загружен, получаем список проектов с бекенда
    //   dispatch(getProjects()).then(() => {
        setIsProjectsLoaded(true);
    //     console.log(projects) // Устанавливаем флаг, что список проектов загружен
    //   });
      
    // }
  }, []);

  if (!isOpen || !isProjectsLoaded) return null; // Рендер попапа только если isOpen === true и список проектов загружен

  return (
    <Popup onClose={onClose}>
      {/* Передаем список проектов в компонент Form */}
      <Form projects={projects} />
    </Popup>
  );
};

export default AddTaskPopup;
