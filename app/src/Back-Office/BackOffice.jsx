import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import RoomTypeForm from './pages/roomtypes/RoomTypeForm';
import Roomtypes from './pages/roomtypes/RoomTypes';

//import Routes from './routes';

function BackOffice() {
	return (
		<Routes>
			<Route path="login" element={<Login/>}/>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="roomtypes" element={<Roomtypes/>} />
				<Route path="roomtypes/new" element={<RoomTypeForm/>} />
				<Route path="roomtypes/:id" element={<Roomtypes/>} />
				<Route path="*" element={<h1>No Subpage found</h1>} />
			</Route>
				
		</Routes>	
	);
}

export default BackOffice;
