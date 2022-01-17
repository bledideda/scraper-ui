
import AuthLayout from './layout/Authlayout';
import LoginPage from './pages/auth/LoginPage';
import { Routes, Route } from "react-router-dom";
import useToken from './hooks/useToken';
import NotFound from './pages/NotFound';

function App() {

  const { token, setToken } = useToken();

  if(token) {
    return (
      <AuthLayout>
        <Routes>
          <Route path="/" element={<LoginPage setToken={setToken}/>} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="*"  element={<NotFound />} />
        </Routes>
      </AuthLayout>
    )
  }

  return (
    <Routes>

      <Route path="*"  element={<NotFound />} />
    </Routes>
  );

}

export default App;
