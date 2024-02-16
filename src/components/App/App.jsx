import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import TaskPopup from '../Task/Task';
import Intro from '../intro/Intro';
import NotFound from '../NotFound/NotFound';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setUser } from '../../store/slices/userSlice';
import { useTranslation } from 'react-i18next';
import UserProfile from '../UserProfile/UserProfile';
import Unauthorized from '../Unauthorized/Unauthorized';
import RequireAuth from '../hoc/RequireAuth';
import Changelog from '../ChangeLog/Changelog';
function App() {
  const theme = useSelector(state => state.theme);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    const userData = localStorage.getItem('userData');

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.dataset.theme = storedTheme;
    } else {
      document.documentElement.dataset.theme = theme;
    };
    if (userData) {
      const { user } = JSON.parse(userData);
      if (user.idToken) {
        dispatch(setUser(user))
      }
    }

  }, [theme, i18n, dispatch]);





  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='*' element={<NotFound />} />
          <Route index element={<Intro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/changelog' element={<Changelog />} />
          {/* Private routes */}
          <Route path='users/me' element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          } />
          <Route path="/projects" element={
            <RequireAuth>
              <ProjectsList />
            </RequireAuth>
          } />
          <Route path="/projects/:projectTitle" element={

            <Project />

          } />
          {/* <Route path="/projects/:projectTitle" element={
            <RequireAuth>
              <Project />
            </RequireAuth>
          } /> */}
          <Route path="/projects/:projectTitle/:taskId" element={
            <RequireAuth>
              <TaskPopup />
            </RequireAuth>
          } />
          

        </Route>
      </Routes>
    </DndProvider>
  );
}

export default App;