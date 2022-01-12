const API_URL = '/books';

export const getAvailableRoomTypes = async ({ hotelID, numGuest, numGuestChild, checkIn_date, checkOut_date }) => {
	try {
		const response = await fetch(`${API_URL}/availability/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({ hotelID, numGuest, numGuestChild, checkIn_date, checkOut_date }),
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const createBook = async ({ client, roomType, room, hotel, pack, total_price, checkIn_date, checkOut_date, purchase_date }) => {
	try {
		const response = await fetch(`${API_URL}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify({ }),
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

// hotel: hotelID,
// client: values.client,
// roomType : values.roomType,
// room: values.room,
// pack: values.pack,
// total_price: values.total_price,
// checkIn_date: values.date[0]._d,
// checkOut_date: values.date[1]._d 

// room
// type: mongoose.Schema.Types.ObjectId
// ref: 'room'
// required: false
// pack
// type: mongoose.Schema.Types.ObjectId
// ref: 'packs'
// required: true
// total_price
// checkIn_date
// checkOut_date