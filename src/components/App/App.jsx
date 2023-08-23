import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import ProjectsList from '../ProjectsList/ProjectsList';
import Project from '../Project/Project';
import TaskPopup from '../Task/Task';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProjectsList />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/:id" element={<Project />} />
        <Route path="/projects/:id/:taskId" element={<TaskPopup />} />
      </Route>
    </Routes>
    </DndProvider>
  );
}

export default App;
