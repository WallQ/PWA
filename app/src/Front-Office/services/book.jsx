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
