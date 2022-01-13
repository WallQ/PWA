import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition  } from '@headlessui/react';
import { FaUsers, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

import { getHotels } from '../../services/hotel';

function Header({ title, titleWord, subTitle, bgImage, searchBar, button }) {
	const navigate = useNavigate();

	const [dateStart, setDateStart] = useState(new Date().toISOString().slice(0, 10));
	const [dateEnd, setDateEnd] = useState(new Date(Date.now()+(3600*1000*24)).toISOString().slice(0, 10));
	const [adult, setAdult] = useState(2);
	const [child, setChild] = useState(0);
	const [selectedHotel, setSelectedHotel] = useState(null);

	const [hotel, setHotel] = useState([]);

	useEffect(() => {
		getHotels()
			.then((result) => {
				if (result.status === 200 && result.data.length) {
					console.log(result);
					setHotel(result.data);
					setSelectedHotel(result.data[0]._id)
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('hotel', { state: {selectedHotel,dateStart,dateEnd,adult,child} });
	};

	return (
		<>
			<div className="w-screen h-screen min-w-full max-w-full min-h-full max-h-full bg-fixed bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center" style={{ backgroundImage: `url(${bgImage})` }}>
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
						<h6 className="text-3xl font-sans font-black capitalize text-white text-center">
							{subTitle}
						</h6>
					)}
					{ searchBar && (
						<div className={`flex flex-col md:flex-row justify-between items-center ${titleWord ? 'mt-8' : 'mt-6'}`}>
							<form onSubmit={handleSubmit} className="flex flex-row">
								<div className="flex flex-col md:flex-row">
									<input type="date" name="startDate" value={dateStart} onChange={(e) => setDateStart(e.target.value)} className="mr-0 md:mr-5 mb-5 md:mb-0 inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans text-lg font-medium tracking-wide leading-normal text-left text-black normal-case align-middle whitespace-normal focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer" />
									<input type="date" name="endDate" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className="mr-0 md:mr-5 mb-5 md:mb-0 inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans text-lg font-medium tracking-wide leading-normal text-left text-black normal-case align-middle whitespace-normal focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer" />
									<div>
										<Menu as="div" className="relative mr-0 md:mr-5 mb-5 md:mb-0">
											{({ open }) => (
												<Fragment>
													<Menu.Button className='inline-flex justify-center items-center w-56 h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans font-medium text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-600'>
														<FaUsers className="mr-2 h-5 w-5 fill-black" aria-hidden="true" />
														<span>{adult} Adult &bull; {child} Child </span>
														{open && (
															<FaChevronUp className="ml-2 h-5 w-5 fill-black" aria-hidden="true" />
														)}
														{!open && (
															<FaChevronDown className="ml-2 h-5 w-5 fill-black" aria-hidden="true" />
														)}
													</Menu.Button>
													<Transition show={open} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
														<Menu.Items className='origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none' static>
															<div className="py-1">
																<Menu.Item>
																	<div className="flex justify-between items-center px-2 h-10">
																		<div>
																			<label className="font-sans text-base font-medium" htmlFor="adult">Adult</label>
																		</div>
																		<div className="flex justify-between items-center">
																			<input type="number" value={adult} onChange={(e) => setAdult(e.target.value)} id="adult" name="custom-input-number" className="hidden opacity-0 w-0 h-0" min="1" max="5"></input>
																			<button type="button" onClick={() => adult === 1 ? null : setAdult(adult - 1) } data-action="decrement" className="flex items-center justify-center w-12 h-full py-1 bg-blue-600 hover:bg-blue-800 outline-none focus:outline-none cursor-pointer">
																				<span className="font-sans text-base font-medium tracking-wide leading-normal text-center text-white normal-case align-middle whitespace-normal">&#8722;</span>
																			</button>								 							
																			<span className="w-10 text-center font-sans font-medium">{adult}</span>				
																			<button type="button" onClick={() => adult === 5 ? null : setAdult(adult + 1) } data-action="increment" className="flex items-center justify-center w-12 h-full py-1 bg-blue-600 hover:bg-blue-800 outline-none focus:outline-none cursor-pointer">
																				<span className="font-sans text-base font-medium tracking-wide leading-normal text-center text-white normal-case align-middle whitespace-normal">&#43;</span>
																			</button>
																		</div>
																	</div>
																</Menu.Item>
																<Menu.Item>
																	<div className="flex justify-between items-center px-2 h-10">
																		<div>
																			<label className="font-sans text-base font-medium" htmlFor="children">Children</label>
																		</div>
																		<div className="flex justify-between items-center">
																			<input type="number" value={child} onChange={(e) => setChild(e.target.value)} id="children" name="custom-input-number" className="hidden opacity-0 w-0 h-0" min="0" max="5"></input>
																			<button type="button" onClick={() => child === 0 ? null : setChild(child - 1)} data-action="decrement" className="flex items-center justify-center w-12 h-full py-1 bg-blue-600 hover:bg-blue-800 outline-none focus:outline-none cursor-pointer">
																				<span className="font-sans text-base font-medium tracking-wide leading-normal text-center text-white normal-case align-middle whitespace-normal">&#8722;</span>
																			</button>								 							
																			<span className="w-10 text-center font-sans font-medium">{child}</span>				
																			<button type="button" onClick={() => child === 5 ? null : setChild(child + 1)} data-action="increment" className="flex items-center justify-center w-12 h-full py-1 bg-blue-600 hover:bg-blue-800 outline-none focus:outline-none cursor-pointer">
																				<span className="font-sans text-base font-medium tracking-wide leading-normal text-center text-white normal-case align-middle whitespace-normal">&#43;</span>
																			</button>
																		</div>
																	</div>
																</Menu.Item>
															</div>
														</Menu.Items>
													</Transition>
												</Fragment>
											)}
										</Menu>
									</div>
								</div>
								<select name="hotel" value={selectedHotel} onChange={(e) => {setSelectedHotel(e.target.value);}} className="mr-0 md:mr-5 mb-5 md:mb-0 inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans text-lg font-medium tracking-wide leading-normal text-left text-black normal-case align-middle whitespace-normal focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer">
									{hotel.map((value, index) => (
										<>
											<option value={value._id} selected={index === 0 ? true : false}>{value.name}</option>
										</>
									))}
								</select>
								<button type="submit" value="submit" className="font-sans text-lg font-bold tracking-wide leading-normal text-left text-white hover:text-white capitalize align-middle whitespace-normal rounded-lg cursor-pointer px-3 h-10 inline-flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700 bg-blue-600 hover:bg-blue-800">
									<FaSearch className="w-5 h-5 mr-2 fill-white" />
									Search
								</button>
							</form>
						</div>
					)}
				</div>
				{ button && (
					<div className="flex justify-center items-center animate-bounce">
						<FaChevronDown className="h-8 w-8 fill-white" />
					</div>
				)}
			</div>
		</>
	);
}

export default Header;
