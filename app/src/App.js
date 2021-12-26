import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import BackOffice from './Back-Office/BackOffice';
import FrontOffice from './Front-Office/Website';

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<BackOffice />} path="/admin/*" />
				<Route element={<FrontOffice />} path="/*" />
			</Routes>
		</Router>
	);
}

export default App;
