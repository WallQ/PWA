import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from './components/Loading/';
import Testing from './components/Testing/';

const Layout = lazy(() => import('./Layout/Main'));
const Homepage = lazy(() => import('./pages/Homepage/'));
const Hotel = lazy(() => import('./pages/Hotel/'));
const SignUp = lazy(() => import('./pages/SignUp/'));
const SignIn = lazy(() => import('./pages/SignIn/'));
const SignOut = lazy(() => import('./pages/SignOut/'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NewPassword = lazy(() => import('./pages/NewPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Website() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Layout />} path="/">
						<Route element={<Homepage />} index />
						<Route element={<Hotel />} path="hotel" />
						<Route element={<NotFound />} path="*" />
					</Route>
					<Route element={<SignUp />} path="sign-up" />
					<Route element={<SignIn />} path="sign-in" />
					<Route element={<SignOut />} path="sign-out" />
					<Route element={<ForgotPassword />} path="forgot-password" />
					<Route element={<NewPassword />} path="new-password" />
					<Route element={<Testing />} path="test" />
				</Routes>
			</Suspense>
		</>
	);
}

export default Website;
