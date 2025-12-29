import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import TaskDetailsPage from './pages/TaskDetailsPage';
import PriorityBoard from './components/Tasks/PriorityBoard';
import AdminUserList from './pages/AdminUserList';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold rounded-none',
          style: {
            background: '#fff',
            color: '#000',
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<PriorityBoard />} />
          <Route path="/users" element={<AdminUserList />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/edit-task/:id" element={<TaskForm />} />
          <Route path="/task/:id" element={<TaskDetailsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
