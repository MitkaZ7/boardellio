import React, {useEffect} from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import TaskPopup from '../Task/Task';
import Intro from '../intro/Intro';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setAuthorizationStatus } from '../../store/slices/userSlice'
import { useTranslation } from 'react-i18next';
import UserProfile from '../UserProfile/UserProfile';
function App() {
  const theme = useSelector(state => state.theme);
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {   
    const storedLanguage = localStorage.getItem('i18nextLng');
    const storedToken = localStorage.getItem('idToken');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    } 
    const storedTheme = localStorage.getItem('theme');   
    if (storedTheme) {
      document.documentElement.dataset.theme = storedTheme;
    } else {
      document.documentElement.dataset.theme = theme;
    };
    if (storedToken) {
      dispatch(setAuthorizationStatus(true));
    }

  }, [theme, i18n, dispatch]);

  


  
  return (
    <DndProvider backend={HTML5Backend}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Intro />} />
        <Route element={<Login />} path='/login'/>
        <Route element={<Registration />} path='/registration' />
        <Route element={<UserProfile />} path='users/me'/>
        <Route index element={<ProjectsList />} />
        <Route path="/projects/" element={<ProjectsList />} />
        <Route path="/projects/:projectTitle" element={<Project />} />
        <Route path="/projects/:projectTitle/:taskId" element={<TaskPopup />} />
      </Route>
    </Routes>
    </DndProvider>
  );
}

export default App;
