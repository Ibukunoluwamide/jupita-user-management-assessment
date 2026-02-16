import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import './App.css';
import UserView from './pages/UserView';

// function protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <PrivateRoute>
                <UserForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <PrivateRoute>
                <UserForm />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/users" replace />} />
        </Routes>
    </Router>
  );
}

export default App;
