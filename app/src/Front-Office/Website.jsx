import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from './components/Loading/';

const Layout = lazy(() => import('./Layout/Main'));
const Homepage = lazy(() => import('./pages/Homepage/'));
const SignUp = lazy(() => import('./pages/SignUp/'));
const SignIn = lazy(() => import('./pages/SignIn/'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Website() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<Layout />} path="/">
					<Route element={<Homepage />} index />
					<Route element={<NotFound />} path="*" />
				</Route>
				<Route element={<SignUp />} path="signup" />
				<Route element={<SignIn />} path="signin" />
				<Route element={<NotFound />} path="*" />
			</Routes>
		</Suspense>
	);
}

export default Website;
