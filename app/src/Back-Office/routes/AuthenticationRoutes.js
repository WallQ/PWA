//import { lazy } from 'react';

// project imports
//import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout/MinimalLayout';

import Login from '../pages/login/Login';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <Login />
        }
    ]
};

export default AuthenticationRoutes;
