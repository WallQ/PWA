import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from './components/Loading/';
const Homepage = React.lazy(() => import('./pages/Homepage/'));
const SignUp = React.lazy(() => import('./pages/SignUp/'));
const SignIn = React.lazy(() => import('./pages/SignIn/'));
const Error = React.lazy(() => import('./pages/Error/'));

function Website() {
	return (
		<div className="bg-light">
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Homepage />} path="/" />
					<Route element={<SignUp />} path="signup" />
					<Route element={<SignIn />} path="signin" />
					<Route element={<Error />} path="*" />
				</Routes>
			</Suspense>
		</div>
	);
}

export default Website;
