
import AuthLayout from './layout/Authlayout';
import LoginPage from './pages/auth/LoginPage';
import { Routes, Route } from "react-router-dom";
import useToken from './hooks/useToken';
import NotFound from './pages/NotFound';
import DashboardLayout from './layout/DashboardLayout';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import HomePage from './pages/panel/HomePage';

function App() {

  const { token, setToken, clearSession } = useToken();

  if (!token) {
    return (
      <AuthLayout>
        <Routes>
          <Route path="/" element={<LoginPage setToken={setToken} />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </AuthLayout>
    )
  }

  return (
    <DashboardLayout clearSession={clearSession}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );

}

export default App;
