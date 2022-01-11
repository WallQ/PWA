import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Guest from '../../components/Guest/';

import { getHotelById } from '../../services/hotel';
import { getAvailableRoomTypes } from '../../services/book';

import Image1 from '../../assets/images/header/cover-1.jpg';
import Image2 from '../../assets/images/header/cover-2.jpg';
import Image3 from '../../assets/images/header/cover-3.jpg';
import Image4 from '../../assets/images/header/cover-4.jpg';

function Hotel() {
	const { hotelID } = useParams();

	const [dateStart, setDateStart] = useState(new Date().toISOString().slice(0, 10));
	const [dateEnd, setDateEnd] = useState(new Date(Date.now()+(3600*1000*24)).toISOString().slice(0, 10));
	const [adult, setAdult] = useState(2);
	const [child, setChild] = useState(0);

	const [loadingHotel, setLoadingHotel] = useState(true);
	const [loadingRoomTypes, setLoadingRoomTypes] = useState(true);
	const [hotel, setHotel] = useState([]);
	const [roomTypes, setRoomTypes] = useState([]);

	useEffect(() => {
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
	}, [hotelID,adult ,child, dateStart ,dateEnd]);
	return (
		<>
			{loadingHotel ? (
				<>
					<span>LOADING HOTEL</span>
				</>
			) : (
				<>
					{hotel.images.map((value) => (
						<img src={`http://127.0.0.1:3030/public/assets/images/${value.path}`} alt={`${value.alt}`} />
					))}

					{hotel.languages.map((value) => (
						<span>
							{value.language}, {value.initials}
						</span>
					))}
					<h1>{hotel.name}</h1>
					<h4>{hotel.description}</h4>
					<h4>{hotel.averagePrice}</h4>
					<h4>{hotel.rating}</h4>
					<a href={`${hotel.url}`} target={`_blank`}>URL</a>
					{hotel.contacts.map((value) => (
						<a href={value.type === 'email' ? `mailto:${value.contact}` : value.type === 'telephone' ? `tel:${value.contact}` : 'N/A'}>{value.type}: {value.contact}</a>
					))}
					<p>{hotel.address.street} N.º {hotel.address.doorNumber}, {hotel.address.postCode} {hotel.address.district} {hotel.address.country}</p>
					<iframe title="map" src={`https://www.google.com/maps/embed/v1/place?q=${hotel.address.locality}&key=AIzaSyA2W8VuMFPLKxR88upABeDzZZkKnU7svV8`}></iframe>
					<p>{hotel.createdDate}</p>
					{hotel.reviews.map((value) => (
						<p>{value.userID.name} {value.userID.surname} - {value.review}</p>
					))}
				</>
			)}
			{loadingRoomTypes ? (
				<>
					<span>LOADING ROOMTYPES</span>
				</>
			) : (
				<>
					<div className="w-full h-full mx-auto container ">
						<div className="flex flex-row gap-x-6 px-6 py-6">
							<div className="flex flex-col basis-1/4 px-4 py-4 bg-white ">
								<form className="flex flex-col gap-y-6">
									<div className="flex flex-col">
										<label htmlFor="search">Search...</label>
										<input type="search" name="search" id="search" placeholder="Search" />
									</div>
									<div className="flex flex-col">
										<label htmlFor="dateStart">Date Start</label>
										<input type="date" name="dateStart" id="dateStart" />
									</div>
									<div className="flex flex-col">
										<label htmlFor="dateEnd">Date End</label>
										<input type="date" name="dateEnd" id="dateEnd" />
									</div>
									<div className="flex flex-col">
										<label htmlFor="guest">Guests</label>
										<select name="guest" id="guest" >
											<option value="adult">Adult</option>
											<option value="child">Child</option>
										</select>
									</div>
									<div className="flex flex-col">
										<button className="bg-blue-600 py-2 text-white font-semibold text-lg">Search</button>
									</div>
									<div className="flex flex-col">
										<iframe title="Hotel Map" src="https://www.google.com/maps/embed/v1/place?q=Porto&amp;key=AIzaSyA2W8VuMFPLKxR88upABeDzZZkKnU7svV8" />
									</div>
								</form>
							</div>
							<div className="flex flex-col basis-3/4 px-4 py-4 bg-teal-400">
								<div className="flex flex-row">							
									<h1 className="text-white font-bold text-lg">Title</h1>
								</div>
								<div className="flex flex-row">
									<div className="flex-col basis-1/4 ">
										<img src={Image1} alt="Test" loading="lazy" />
										<img src={Image2} alt="Test" loading="lazy" />
										<img src={Image3} alt="Test" loading="lazy" />
									</div>
									<div className="flex-col basis-3/4">
										<img src={Image4} alt="Test" loading="lazy" />
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row gap-x-6 px-6">
							<div className="flex flex-col basis-3/4 px-4 py-4 bg-green-400">
								<div className="flex flex-row">							
									<h1 className="text-white font-bold text-lg">Title</h1>
								</div>
								<div className="flex flex-row">
									<p>TEST</p>
								</div>
							</div>
							<div className="flex flex-col basis-1/4 px-4 py-4 bg-amber-400 ">
								<form className="flex flex-col gap-y-6">
									<div className="flex flex-col">
										<label htmlFor="search">Search...</label>
										<input type="search" name="search" id="search" placeholder="Search" />
									</div>
									<div className="flex flex-col">
										<label htmlFor="dateStart">Date Start</label>
										<input type="date" name="dateStart" id="dateStart" />
									</div>
									<div className="flex flex-col">
										<label htmlFor="dateEnd">Date End</label>
										<input type="date" name="dateEnd" id="dateEnd" />
									</div>
									<div className="flex flex-col">
										<label htmlFor="guest">Guests</label>
										<select name="guest" id="guest" >
											<option value="adult">Adult</option>
											<option value="child">Child</option>
										</select>
									</div>
									<div className="flex flex-col">
										<button className="bg-blue-600 py-2 text-white font-semibold text-lg">Search</button>
									</div>
									<div className="flex flex-col">
										<iframe title="Hotel Map" src="https://www.google.com/maps/embed/v1/place?q=Porto&amp;key=AIzaSyA2W8VuMFPLKxR88upABeDzZZkKnU7svV8" />
									</div>
								</form>
							</div>
						</div>
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
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{roomTypes.map((value) => (
										<>
											<tr>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="inline-flex">
														<Guest number={value.maxGuest} type={"Adult"} style={`fill-blue-600 w-4 h-4`} />
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">{value.name}</td>
												<td className="px-6 py-4 whitespace-nowrap">{value.description}</td>
												<td className="px-6 py-4 whitespace-nowrap">
													{value.facilities.map((value) => (
														<tr>
															<td>{value.icon}</td>
															<td>{value.description}</td>
														</tr>
													))}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													{value.packs.map((value) => (
														<tr>
															<td>{value.name}</td>
															<td>{value.dailyPrice}</td>
															<tr>
																<td>{value.include.join(', ')}</td>
															</tr>
														</tr>
													))}
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
