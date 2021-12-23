import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import BackOffice from './Back-Office/BackOffice';
import FrontOffice from './Front-Office/Website';

function App() {
	return (
		<Routes>
			<Route element={<BackOffice />} path="/admin/*" />
			<Route element={<FrontOffice />} path="/*" />
		</Routes>
	);
}

export default App;
