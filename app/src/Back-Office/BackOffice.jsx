import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';

//import Routes from './routes';

function BackOffice() {
	return (
		<Routes>
			<Route path="login" element={<Login/>}/>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="about" element={<h1>about</h1>} />
				<Route path="barcos" element={<h1>Barcos</h1>} />
				<Route path="*" element={<h1>No Subpage found</h1>} />
			</Route>
				
		</Routes>	
	);
}

export default BackOffice;
