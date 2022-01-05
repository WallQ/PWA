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
			<div className="">
				<h1>{hotelID}</h1>
			</div>
		</>
	);
}

export default Hotel;
