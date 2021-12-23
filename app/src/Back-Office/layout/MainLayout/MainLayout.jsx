import React from 'react';
import {Outlet} from "react-router-dom";
import NavLink from './NavLink';
  
const MainLayout = () => {
    return (
        <div>
            <header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    <nav className="flex ml-8">
                    <NavLink
                        to=""
                        exact={true}
                        activeClassName="text-gray-700 bg-gray-100"
                        inactiveClassName="text-gray-500 hover:text-gray-700"
                        className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to="new-users"
                        activeClassName="text-gray-700 bg-gray-100"
                        inactiveClassName="text-gray-500 hover:text-gray-700"
                        className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
                    >
                        New users
                    </NavLink>
                    <NavLink
                        to="sales"
                        activeClassName="text-gray-700 bg-gray-100"
                        inactiveClassName="text-gray-500 hover:text-gray-700"
                        className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
                    >
                        Sales
                    </NavLink>
                    </nav>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div> 
    );
}

export default MainLayout;