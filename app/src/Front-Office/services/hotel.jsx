const API_URL = '/hotel';

export const getHotels = async (value) => {
	try {
		const response = await fetch(`${API_URL}?${new URLSearchParams( value )}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const getHotelById = async ({ hotelID }) => {
	try {
		const response = await fetch(`${API_URL}/${hotelID}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};
