const API_URL = '/roomTypes';

export const getRoomTypeById = async ({ roomTypeID }) => {
	try {
		const response = await fetch(`${API_URL}/${roomTypeID}/`, {
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