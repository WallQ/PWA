import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

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
					<span>LOADING</span>
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
				</>
			)}
		</>
	);
}

export default Hotel;
