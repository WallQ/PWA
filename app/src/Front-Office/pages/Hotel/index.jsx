import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Transition  } from '@headlessui/react';

import StarRating from '../../components/StarRating/';
import Guest from '../../components/Guest/';

import { getHotels, getHotelById } from '../../services/hotel';
import { getAvailableRoomTypes, createBook } from '../../services/book';

import { FaUsers, FaChevronDown, FaChevronUp, FaSearch, FaPhone, FaEnvelope, FaBook } from 'react-icons/fa';

function Hotel() {
	const location = useLocation();
	const hotelID = location.state.selectedHotel;

	const [loadingHotel, setLoadingHotel] = useState(true);
	const [loadingRoomTypes, setLoadingRoomTypes] = useState(true);
	const [hotel, setHotel] = useState([]);
	const [hotels, setHotels] = useState([]);
	const [roomTypes, setRoomTypes] = useState([]);

	const [dateStart, setDateStart] = useState(location.state.dateStart ? location.state.dateStart : new Date().toISOString().slice(0, 10));
	const [dateEnd, setDateEnd] = useState(location.state.dateEnd ? location.state.dateEnd : new Date(Date.now()+(3600*1000*24)).toISOString().slice(0, 10));
	const [adult, setAdult] = useState(location.state.adult ? location.state.adult : 2);
	const [child, setChild] = useState(location.state.child ? location.state.child : 0);
	const [selectedHotel, setSelectedHotel] = useState(location.state.selectedHotel ? location.state.selectedHotel : hotels[0]._id);
	const [selectedPack, setSelectedPack] = useState('');
	const [selectedRoomType, setSelectedRoomType] = useState('');

	useEffect(() => {
		getHotels()
		.then((result) => {
			if (result.status === 200 && result.data.length) {
				console.log(result);
				setHotels(result.data);
			}
		})
		.catch((error) => {
			console.error(error);
		});
		getHotelById({ hotelID })
			.then((result) => {
				if (result.status === 200) {
					console.log(result);
					setHotel(result.data);
					setLoadingHotel(false);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		getAvailableRoomTypes({ hotelID, numGuest:adult, numGuestChild:child, checkIn_date:dateStart, checkOut_date:dateEnd })
			.then((result) => {
				if (result.status === 200) {
					console.log(result);
					setRoomTypes(result.data);
					setLoadingRoomTypes(false);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [hotelID, adult, child, dateStart, dateEnd]);

	const book = () => {
		createBook({ })
			.then((result) => {
				if (result.auth === true) {
					// setRedirect(true);
				}
				console.log(result);
				// setMessage(result.message);
				// setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				// setLoading(false);
			});
	};

	const handleClick = (e) => {
		e.preventDefault();
		book();
	};

	return (
		<>
			{loadingHotel ? (
				<>
					<span>LOADING HOTEL</span>
				</>
			) : (
				<>
					<div className="w-screen h-screen min-w-full max-w-full min-h-full max-h-full">
						<img src={`http://127.0.0.1:3030/public/assets/images/${hotel.coverImage.path}`} alt={`${hotel.coverImage.alt}`} className="w-full h-full object-cover" loading="lazy" />
					</div>
					<div className="w-full h-full mx-auto container ">
						<div className="flex flex-col lg:flex-row gap-x-6 gap-y-6 px-6 py-6">
							<div className="flex flex-col basis-1/4 px-4 py-4 border-2 border-dashed border-gray-200">
								<form className="flex flex-col gap-y-6">
									<div className="flex flex-col">
										<input type="date" name="startDate" value={dateStart} onChange={(e) => setDateStart(e.target.value)} className="mb-5 md:mb-0 inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans text-lg font-medium tracking-wide leading-normal text-left text-black normal-case align-middle whitespace-normal focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer" />
									</div>
									<div className="flex flex-col">
										<input type="date" name="endDate" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className="mb-5 md:mb-0 inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans text-lg font-medium tracking-wide leading-normal text-left text-black normal-case align-middle whitespace-normal focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer" />
									</div>
									<div className="flex flex-col">
										<Menu as="div" className="relative mb-5 md:mb-0">
											{({ open }) => (
												<Fragment>
													<Menu.Button className='inline-flex justify-start items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans font-medium text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-600'>
														<FaUsers className="mr-2 h-5 w-5 fill-black" aria-hidden="true" />
														<span>{adult} Adult &bull; {child} Child </span>
														<div className="ml-auto">
															{open && (
																<FaChevronUp className="ml-2 h-5 w-5 fill-black" aria-hidden="true" />
															)}
															{!open && (
																<FaChevronDown className="ml-2 h-5 w-5 fill-black" aria-hidden="true" />
															)}
														</div>
													</Menu.Button>
													<Transition show={open} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
														<Menu.Items className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none' static>
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
									<div className="flex flex-col">
										<select name="hotel" value={selectedHotel} onChange={(e) => {setSelectedHotel(e.target.value);}} className="mb-5 md:mb-0 inline-flex justify-center items-center w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm bg-white font-sans text-lg font-medium tracking-wide leading-normal text-left text-black normal-case align-middle whitespace-normal focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer">
											{hotels.map((value, index) => (
												<>
													<option value={value._id} selected={index === 0 ? true : false}>{value.name}</option>
												</>
											))}
										</select>
									</div>
									<div className="flex flex-col">
										<button type="submit" value="submit" className="font-sans text-lg font-bold tracking-wide leading-normal text-center text-white hover:text-white capitalize align-middle whitespace-normal rounded-lg cursor-pointer px-3 h-10 inline-flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-700 bg-blue-600 hover:bg-blue-800">
											<FaSearch className="w-5 h-5 mr-2 fill-white" />
											Search
										</button>
									</div>
									<div className="flex flex-col">
										<iframe title="Hotel Map" src={`https://www.google.com/maps/embed/v1/place?q=${hotel.address.locality}&key=AIzaSyA2W8VuMFPLKxR88upABeDzZZkKnU7svV8`} />
										<p>{hotel.address.street} N.º {hotel.address.doorNumber}, {hotel.address.postCode} {hotel.address.district} {hotel.address.country}</p>
									</div>
									<div className="flex flex-col">
										{hotel.contacts.map((value) => (
											<a href={value.type === 'email' ? `mailto:${value.contact}` : value.type === 'telephone' ? `tel:${value.contact}` : 'N/A'} className="inline-flex items-center">{value.type === 'email' ? <FaEnvelope /> : value.type === 'telephone' ? <FaPhone /> : 'N/A'}&nbsp; {value.contact}</a>
										))}
									</div>
								</form>
							</div>
							<div className="flex flex-col basis-3/4 px-4 py-4 border-2 border-dashed border-gray-200">
								<div className="flex flex-col">
									<div className="flex-col xl:inline-flex xl:flex-row xl:justify-between items-center">
										<div className="inline-flex items-center">
											<a className="text-blue-600 font-bold text-xl mb-0 hover:text-blue-600" href={`${hotel.url}`} target={`_blank`}>
												{hotel.name}
											</a>
											&nbsp;<StarRating rating={hotel.rating} style={`fill-blue-600 w-4 h-4`} />
										</div>
										<div>
											{hotel.languages.map((option) => (
												<span key={option._id} className="after:content-['\2022'] last:after:content-['']"> {option.language} </span>
											))}
										</div>
									</div>
									<h3>{hotel.description}</h3>
								</div>
								<div className="flex flex-col lg:flex-row py-4">
									<div className="flex-col basis-1/4 ">
										{hotel.images.map((value, index) => index < 3 &&(											
											<img src={`http://127.0.0.1:3030/public/assets/images/${value.path}`} alt="Test" loading="lazy" />
										))}
									</div>
									<div className="flex-col basis-3/4">
										<img src={`http://127.0.0.1:3030/public/assets/images/${hotel.coverImage.path}`} alt="Test" loading="lazy" />
									</div>
								</div>
							</div>
						</div>
					</div>
					{hotel.reviews.map((value) => (
						<p>{value.userID.name} {value.userID.surname} - {value.review}</p>
					))}
				</>
			)}
			{loadingRoomTypes ? (
				<>
					<span>LOADING ROOM TYPES</span>
				</>
			) : (
				<>
					<div className="w-full h-full mx-auto container ">
						<div className="flex flex-row gap-x-6 px-6 mt-6">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Capacity
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Room Type
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Description
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Facilities
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Packs
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Book
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{roomTypes.map((roomType) => (
										<>
											<tr>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="inline-flex">
														<Guest number={roomType.maxGuest} type={"Adult"} style={`fill-blue-600 w-4 h-4`} />
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">{roomType.name}</td>
												<td className="px-6 py-4 whitespace-nowrap">{roomType.description}</td>
												<td className="px-6 py-4 whitespace-nowrap">

												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													{roomType.packs.map((value) => (
														<tr>
															<td>
																<div className="inline-flex items-center">
																	<input type="radio" name="pack" id={value._id} value={value._id} onChange={(e) => { setSelectedPack(e.target.value); setSelectedRoomType(roomType._id); }} />
																	<label htmlFor={value._id}>&nbsp;{value.name} - &#36;{value.dailyPrice}</label>
																</div>
																<ul>
																	<li>{value.include.join(', ')}</li>
																</ul>
															</td>
														</tr>
													))}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<input type="hidden" value={roomType._id} />
													<button onClick={handleClick} value="submit" className="font-sans text-lg font-bold tracking-wide leading-normal text-center text-white hover:text-white capitalize align-middle whitespace-normal rounded-lg cursor-pointer px-3 h-10 inline-flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-700 bg-blue-600 hover:bg-blue-800">
														<FaBook className="w-5 h-5 mr-2 fill-white" />
														Book
													</button>
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Hotel;
