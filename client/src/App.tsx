import { Route, Outlet, BrowserRouter, Routes } from 'react-router-dom';

import LoginForm from './LoginForm'; // Import your LoginForm component
import RegisterForm from './RegistersForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="login" index element={<LoginForm />} />
          <Route path="sign-up" element={<RegisterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
