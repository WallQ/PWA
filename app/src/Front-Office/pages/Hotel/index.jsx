import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { getHotelRoomTypes } from '../../services/hotel';

function Hotel() {
    const { hotelID } = useParams ();

	const [loading, setLoading] = useState(true);
	const [roomTypes, setRoomTypes] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		getHotelRoomTypes({ hotelID })
			.then((result) => {
				if (result.status === 200) {
                    console.log(result);
					setRoomTypes(result.data);
					setLoading(false);
				}
			})
			.catch((error) => {
                console.error(error);
				setMessage(error);
			});
	}, [hotelID]);

    return (
        <div>
            <h1>{hotelID}</h1>
        </div>
    )
}

export default Hotel
