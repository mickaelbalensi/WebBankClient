import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import LogoWithNavbar from './layouts/LogoWithNavbar';
//
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Account from './pages/Account';
import Loan from './pages/Loan';
import Borrow from './pages/Borrow';
import Transfer from './pages/Transfer';
import Transaction from './pages/Transaction';
import UpdateProfile from './pages/UpdateProfile';
import AcceptProfile from './pages/AcceptProfile';
import Home from './pages/Home2';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoWithNavbar />,
      children: [
        { path: '/', element: <Home /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'myaccount', element: <Account /> },
        { path: 'loans', element: <Loan /> },
        { path: 'borrow', element: <Borrow /> },
        { path: 'transfer', element: <Transfer /> },
        { path: 'mytransactions', element: <Transaction /> },
        { path: 'updateprofile', element: <UpdateProfile /> },
        { path: 'acceptprofile/:id', element: <AcceptProfile /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'home', element: <Home /> },
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        
      ],
    },
    {
      path: '/dash',
      element: <LogoWithNavbar />,
      children: [
        { path: 'home', element: <Home /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
