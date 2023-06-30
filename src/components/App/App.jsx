import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';
import TaskPopup from '../Task/Task';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProjectsList />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/projects/:id/:taskId" element={<TaskPopup />} />
      </Route>
    </Routes>
  );
}

export default App;
