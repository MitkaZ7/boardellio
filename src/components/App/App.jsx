import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Layout from '../Layout';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import TaskPopup from '../Task/Task';
import Intro from '../intro/Intro';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {

  return (
    <DndProvider backend={HTML5Backend}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Intro />} />
        <Route element={<Login />} path='/login'/>
        <Route element={<Registration />} path='/registration' />
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
