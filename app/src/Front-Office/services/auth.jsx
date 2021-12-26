const API_URL = 'http://127.0.0.1:3030/auth';

export const signUp = async ({ name, surname, email, password }) => {
	try {
		const response = await fetch(`${API_URL}/sign-up`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ name, surname, email, password }),
		});
		return await response.json();
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const signIn = async (email, password) => {
	try {
		const response = await fetch(`${API_URL}/sign-in`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ email, password }),
		});
		return await response.json();
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const signOut = async () => {
	try {
		const response = await fetch(`${API_URL}/sign-out`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(),
		});
		return await response.json();
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};
