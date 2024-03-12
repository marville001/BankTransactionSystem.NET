import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import LoginPage from "./pages/auth/login";
import AccountsPage from "./pages/accounts";

import AppWrapper from "./components/shared/AppWrapper";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AuthGuard from "./components/shared/auth-guard";
import NotFound from "./pages/404";
import RegisterPage from "./pages/auth/register";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    {
      path: "/app", element: <AuthGuard><AppWrapper /></AuthGuard>,
      children: [
        { index: true, element: <AccountsPage /> }
      ]
    },
    { path: "*", element: <NotFound />}
  ]);

  return (
    <div className="bg-pattern main-wrapper">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
