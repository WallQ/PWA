import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getRoomTypeById } from '../../services/roomType';

function Room() {
	const { roomTypeID } = useParams();

	const [loadingRoomType, setLoadingRoomType] = useState(true);
	const [roomType, setRoomType] = useState([]);

	useEffect(() => {
		getRoomTypeById({ roomTypeID })
			.then((result) => {
				if (result.status === 200) {
					console.log(result);
					setRoomType(result.data);
					setLoadingRoomType(false);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [roomTypeID]);

	return (
		<>
			{loadingRoomType ? (
				<>
					<span>LOADING ROOMTYPES</span>
				</>
			) : (
				<ul>
					<li>Area {roomType.area}</li>
					<li>{roomType.name}</li>
					<li>{roomType.description}</li>
					<li>Adult {roomType.maxGuest}</li>
					<li>Child {roomType.maxGuestChild}</li>
					<ul>
						{roomType.facilities.map((value) => (
							<>
								<li>{value.icon}</li>
								<li>{value.description}</li>
							</>
						))}
					</ul>
				</ul>
			)}
		</>
	);
}

export default Room;
