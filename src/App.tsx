import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import { routes } from './routes';

function App() {
  return (
    <Routes>
      { routes.map(item => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Routes>
  );
}

export default App;
