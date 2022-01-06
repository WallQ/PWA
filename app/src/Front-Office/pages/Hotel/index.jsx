import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { getHotelById, getHotelRoomTypes } from '../../services/hotel';

function Hotel() {
	const { hotelID } = useParams();

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
		getHotelRoomTypes({ hotelID })
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
	}, [hotelID]);

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
					<ul>
						{roomTypes.roomTypes.map((value) => (
							<>
								<NavLink to={`/room/${value._id}/`}>
									<li>Area {value.area}</li>
									<li>{value.name}</li>
									<li>{value.description}</li>
									<li>Adult {value.maxGuest}</li>
									<li>Child {value.maxGuestChild}</li>
									<ul>
										{value.facilities.map((value) => (
											<>
												<li>{value.icon}</li>
												<li>{value.description}</li>
											</>
										))}
									</ul>
									<ul>
										{value.packs.map((value) => (
											<>
												<li>{value.name}</li>
												<li>{value.dailyPrice}</li>
												<li>{value.freeCancel}</li>
												<li>{value.maxGuest}</li>
												<li>{value.maxGuestChild}</li>
												<ul>
													<>
														<li>{value.include.join(', ')}</li>
													</>
												</ul>
											</>
										))}
									</ul>
									<hr />
								</NavLink>
							</>
						))}
					</ul>
				</>
			)}
		</>
	);
}

export default Hotel;
