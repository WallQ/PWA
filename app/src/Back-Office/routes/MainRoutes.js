import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/MainLayout';
import Loadable from '../components/Loadable';

const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));
const RoomTypes = Loadable(lazy(() => import('../pages/roomtypes/RooTypes')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/roomtypes',
            element: <RoomTypes />
        }
    ]
};

export default MainRoutes;
