import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../store/slices/popupSlice';
import { getProjects } from '../../store/slices/projectSlice';
import { createTaskSchema } from '../../utils/validation';
const AddTaskPopup = () => {
  const dispatch = useDispatch();
  // const isOpen = useSelector((state) => state.popup.isOpen);
  const { addTaskPopup: { isOpen } = false } = useSelector(state => state.popup.openedPopups);

  const { projects, isLoad } = useSelector(state => state.projects);

  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

  const onClose = () => {
    // console.log('closed add new task popup')
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
    <Popup isOpen={isOpen} popupName={'addTaskPopup'} >
      <Form projects={projects} validationSchema={createTaskSchema} />
    </Popup>
  );
};

export default AddTaskPopup;
