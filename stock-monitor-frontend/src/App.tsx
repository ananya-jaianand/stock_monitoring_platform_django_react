// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <LoginPage/>} />
        <Route path="/register" element={ <RegistrationPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
