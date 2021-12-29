const API_URL = '/hotel';

export const getHotel = async () => {
	try {
		const response = await fetch(`${API_URL}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};
