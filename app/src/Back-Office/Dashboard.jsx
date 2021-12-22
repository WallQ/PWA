import React from 'react';
import {Routes, Route} from 'react-router-dom';

function Dashboard() {
	return (
		<div>
			<h1>Back Office</h1>
			<Routes>
				<Route path="dashboard" element={<p>Dashboard</p>}/>
			</Routes>
		</div>	
	);
}

export default Dashboard;
