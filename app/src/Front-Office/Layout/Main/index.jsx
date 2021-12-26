import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar/';
import Footer from '../../components/Footer/';
import Scroll from '../../components/Scroll/';

function Main() {
	return (
		<div className="bg-myLight dark:bg-myDark">
			<header>
				<Navbar />
			</header>
			<main>
				<Outlet />
				<Scroll />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default Main;
