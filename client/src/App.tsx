import { Route, Outlet, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm"; 
import RegisterForm from "./RegistersForm";
import UserProfile from "./UserProfile";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            path="login"
            index
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="sign-up" element={<RegisterForm />} />
          {isAuthenticated ? (
            <Route path="user-profile" element={<UserProfile />} />
          ) : (
            <Route
              path="user-profile"
              element={<Navigate to="/login" />}
            />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
