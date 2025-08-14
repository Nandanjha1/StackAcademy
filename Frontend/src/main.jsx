// src/index.js
import { StrictMode, createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Correct placement */}
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>,
);