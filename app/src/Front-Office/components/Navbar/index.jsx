import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { FaUser, FaUserPlus, FaUserTimes, FaSearch, FaChevronDown } from 'react-icons/fa';

function Navbar() {
	const [navBar, setNavbar] = useState(false);
	// const [dropDown, setDropDown] = useState(false);

	const changeNavBarBgColor = () => {
		if (window.scrollY >= 100) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	window.addEventListener('scroll', changeNavBarBgColor);
	return (
		<nav className={`w-full py-6 px-4 fixed z-10 ease-linear duration-500 ${navBar ? 'bg-blue-600' : ''}`}>
			<div className="flex justify-between items-center container mx-auto">
				<NavLink to="/" className="flex">
					<img src={logo} className="w-12 h-12" alt="logo" />
					<h1 className="font-sans text-2xl font-bold leading-6 text-left text-white ml-4 mb-0">
						PWA <br /> BOOKING
					</h1>
				</NavLink>
				<div className="hidden md:flex">
					<div className="relative">
						<input type="text" id="Search" name="search" placeholder="Search" className={`h-10 px-3 pr-10 ring-0 focus:outline-none ease-linear duration-500 font-sans text-base font-medium text-left ${navBar ? 'bg-transparent border-b-2 border-white rounded-none text-white placeholder:text-white' : 'bg-transparent border-b-2 border-blue-600 rounded-none text-white'}`} />
						<button type="submit" value="submit" className="absolute right-0 top-0 mt-2.5 mr-3">
							<FaSearch className={`w-5 h-5 ease-linear duration-500 ${navBar ? 'fill-white' : 'fill-blue-600'}`} />
						</button>
					</div>
					<NavLink to="/sign-up" className={`btn-primary ${navBar ? '' : ' bg-blue-600 hover:bg-blue-700 '}`}>
						<FaUserPlus className="w-5 h-5 mr-2 fill-white" />
						Sign Up
					</NavLink>
					<NavLink to="/sign-in" className={`btn-primary ${navBar ? '' : ' bg-blue-600 hover:bg-blue-700 '}`}>
						<FaUser className="w-5 h-5 mr-2 fill-white" />
						Sign In
					</NavLink>
					<NavLink to="/sign-out" className={`btn-primary ${navBar ? '' : ' bg-blue-600 hover:bg-blue-700 '}`}>
						<FaUserTimes className="w-5 h-5 mr-2 fill-white" />
						Sign Out
					</NavLink>
				</div>
				<div className="flex md:hidden">
					<div className="relative inline-block">
						<button className="relative z-10 block rounded-md focus:outline-none" type="button">
							<FaChevronDown className="h-8 w-8 text-white" />
						</button>
						{/* <div className={`absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl ease-linear duration-700 ${dropDown ? '' : 'invisible'}`}>
							<NavLink to="/sign-up" className="flex px-4 py-2 text-black capitalize">
								<UserAddIcon className="h-5 w-5 text-black" />&nbsp;Sign Up
							</NavLink>
							<NavLink to="/sign-in" className="flex px-4 py-2 text-black capitalize">
								<UserIcon className="h-5 w-5 text-black" />&nbsp;Sign In
							</NavLink>
							<NavLink to="/sign-out" className="flex px-4 py-2 text-black capitalize">
								<UserRemoveIcon className="h-5 w-5 text-black" />&nbsp;Sign Out
							</NavLink>
						</div> */}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
