import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from './reduxToolkit/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          { routes.map(item => (
            <Route key={item.path} path={item.path} element={item.component} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
