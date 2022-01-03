import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Menu, Transition  } from '@headlessui/react';

import logo from '../../assets/images/logo.svg';
import { FaUser, FaUserPlus, FaUserMinus, FaSearch, FaChevronUp, FaChevronDown } from 'react-icons/fa';

import { signEd } from '../../services/auth';

function Navbar() {
	const [authenticated, setAuthenticated] = useState(false);
	const [navBar, setNavbar] = useState(false);

	const changeNavBarBgColor = () => {
		if (window.scrollY >= 100) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	window.addEventListener('scroll', changeNavBarBgColor);

	useEffect(() => {
		signEd()
			.then((result) => {
				if(result.auth === true) {
					console.log(result);
					setAuthenticated(true);
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}, []);

	return (
		<nav className={`w-full py-6 px-4 fixed z-40 ease-linear duration-500 ${navBar ? 'bg-blue-600' : ''}`}>
			<div className="flex justify-between items-center container mx-auto">
				<NavLink to="/" className="flex">
					<img src={logo} className="w-12 h-12" alt="logo" />
					<h1 className="font-sans text-2xl font-bold leading-6 text-left text-white ml-4 mb-0">
						PWA <br /> BOOKING
					</h1>
				</NavLink>
				<div className="hidden lg:flex">
					<div className="relative">
						<input type="text" id="Search" name="search" placeholder="Search" className={`h-10 px-3 pr-10 focus:outline-none outline-none ease-linear duration-500 font-sans text-base font-medium bg-transparent text-white placeholder:text-white rounded-none border-b-2  ${navBar ? 'border-white' : 'border-blue-600'}`} />
						<button type="submit" value="submit" className="absolute right-0 top-0 mt-2.5 mr-3">
							<FaSearch className={`w-5 h-5 ease-linear duration-500 ${navBar ? 'fill-white' : 'fill-blue-600'}`} />
						</button>
					</div>
					{authenticated 
						?
						<div>
							<NavLink to="/sign-out" className={`font-sans text-lg font-bold tracking-wide leading-normal text-left text-white hover:text-white capitalize align-middle whitespace-normal rounded-lg cursor-pointer px-3 h-10 ml-3 inline-flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700 bg-blue-600 ${navBar ? '' : 'hover:bg-blue-800'}`}>
								<FaUserMinus className="w-5 h-5 mr-2 fill-white" />
								Sign Out
							</NavLink>
						</div>
						:
						<div>
							<NavLink to="/sign-up" className={`font-sans text-lg font-bold tracking-wide leading-normal text-left text-white hover:text-white capitalize align-middle whitespace-normal rounded-lg cursor-pointer px-3 h-10 ml-3 inline-flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700 bg-blue-600 ${navBar ? '' : 'hover:bg-blue-800'}`}>
								<FaUserPlus className="w-5 h-5 mr-2 fill-white" />
								Sign Up
							</NavLink>
							<NavLink to="/sign-in" className={`font-sans text-lg font-bold tracking-wide leading-normal text-left text-white hover:text-white capitalize align-middle whitespace-normal rounded-lg cursor-pointer px-3 h-10 ml-3 inline-flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700 bg-blue-600 ${navBar ? '' : 'hover:bg-blue-800'}`}>
								<FaUser className="w-5 h-5 mr-2 fill-white" />
								Sign In
							</NavLink>
						</div>
					}
				</div>
				<div className="lg:hidden">
					<Menu as="div" className="relative">
						{({ open }) => (
							<Fragment>
								<Menu.Button className='inline-flex justify-center items-center w-full h-10 px-3 font-sans font-medium text-base focus:outline-none'>
									{open && (
										<FaChevronUp className="h-5 w-5 fill-white" aria-hidden="true" />
									)}
									{!open && (
										<FaChevronDown className="h-5 w-5 fill-white" aria-hidden="true" />
									)}
								</Menu.Button>
								<Transition show={open} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
									<Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none' static>
										<div className="py-1">
										{authenticated 
											?
											<>
												<Menu.Item>
													<NavLink to="/sign-out" className="flex items-center px-4 py-2 font-sans text-base font-medium transition ease-out duration-300 text-blue-600 hover:bg-blue-800 fill-blue-600 hover:fill-white">
														<FaUserMinus className="mr-3 h-5 w-5 " aria-hidden="true" />
														Sign Out
													</NavLink>
												</Menu.Item>
											</>
											:
											<>
												<Menu.Item>
													<NavLink to="/sign-up" className="flex items-center px-4 py-2 font-sans text-base font-medium transition ease-out duration-300 text-blue-600 hover:bg-blue-800 fill-blue-600 hover:fill-white">
														<FaUserPlus className="mr-3 h-5 w-5 " aria-hidden="true" />
														Sign Up
													</NavLink>
												</Menu.Item>
												<Menu.Item>
													<NavLink to="/sign-in" className="flex items-center px-4 py-2 font-sans text-base font-medium transition ease-out duration-300 text-blue-600 hover:bg-blue-800 fill-blue-600 hover:fill-white">
														<FaUser className="mr-3 h-5 w-5 " aria-hidden="true" />
														Sign In
													</NavLink>
												</Menu.Item>
											</>
										}
										</div>
									</Menu.Items>
								</Transition>
							</Fragment>
						)}
					</Menu>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
