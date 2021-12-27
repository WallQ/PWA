import React, { Fragment } from 'react';
import { Menu, Transition  } from '@headlessui/react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

function Header({ title, titleWord, subTitle, bgImage, searchBar, button }) {
	return (
		<div>
			<div className="w-screen h-screen max-w-full max-h-full bg-fixed bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center" style={{ backgroundImage: `url(${bgImage})` }}>
				<div className="m-auto">
					{ title && (
						<h1 className="text-7xl font-sans font-black capitalize text-white text-center bg-clip-text bg-gradient-to-r from-indigo-500 mb-3">
							{title}
							{ titleWord && (
								<span className="ml-3 before:block before:absolute before:-inset-1 before:skew-y-3 before:bg-blue-600 relative inline-block">
									<span className="relative text-white">{ titleWord }</span>
								</span>
							)}
						</h1>
					)}
					{ subTitle && (
						<h6 className="text-3xl font-sans font-black capitalize text-white text-center text-shadow-lg">
							{subTitle}
						</h6>
					)}
					{ searchBar && (
						<div className={`flex flex-col md:flex-row justify-between items-center ${titleWord ? 'mt-6' : 'mt-6'}`}>
							<div className="flex flex-col md:flex-row">
								<input type="date" name="startDate" className='input-date'/>
								<input type="date" name="endDate" className='input-date'/>
								<div>
									<Menu as="div" className="relative mr-0 md:mr-5 mb-5 md:mb-0">
										{({ open }) => (
											<Fragment>
												<Menu.Button className='inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans font-medium text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-600'>
													Options
													<FaChevronDown className="ml-2 h-5 w-5 fill-black" aria-hidden="true" />
												</Menu.Button>
												<Transition show={open} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
													<Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none' static>
														<div className="py-1">
															<Menu.Item>
																{({ active, disabled }) => (
																	<a href="https://www.google.pt/" className={`flex items-center px-4 py-2 text-sm ${disabled ? 'text-gray-300' : active ? 'bg-blue-600 text-white': 'text-gray-700'}`}>
																		<FaChevronDown className={`mr-3 h-5 w-5 ${active ? 'text-white': 'text-gray-400'}`} aria-hidden="true" />
																		TEST 1
																	</a>
																)}
															</Menu.Item>
															<Menu.Item disabled>
																{({ active, disabled }) => (
																	<a href="https://www.google.pt/" className={`flex items-center px-4 py-2 text-sm ${disabled ? 'text-gray-300' : active ? 'bg-indigo-500 text-white': 'text-gray-700'}`}>
																		<FaChevronDown className={`mr-3 h-5 w-5 ${disabled ? 'text-gray-200' : active ? 'text-white': 'text-gray-400'}`} aria-hidden="true" />
																		TEST 1
																	</a>
																)}
															</Menu.Item>
														</div>
													</Menu.Items>
												</Transition>
											</Fragment>
										)}
									</Menu>
								</div>
							</div>
							<button type="submit" value="submit" className="btn-primary bg-blue-600 hover:bg-blue-700">
								<FaSearch className="w-5 h-5 mr-2 fill-white" />
								Sign Up
							</button>
						</div>
					)}
				</div>
				{ button && (
					<div className="flex justify-center items-center animate-bounce">
						<FaChevronDown className="h-8 w-8 fill-white" />
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
