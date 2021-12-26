const API_URL = 'http://127.0.0.1:3030/auth';

export const signUp = ({ name, surname, email, password }) => {
	let singUpStatus = false;
	fetch(`${API_URL}/sign-up`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, surname, email, password }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			return response.json();
		})
		.then((response) => {
			if (response.auth) {
				singUpStatus = true;
			}
		})
		.catch((error) => {
			console.error('Error fetching data: ', error);
		})
		.finally(() => {
			return singUpStatus;
		});
};

export const signIn = (email, password) => {
	return fetch(`${API_URL}/sign-in`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ email, password }),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error('Error fetching data: ', error);
		});
};

export const signOut = () => {
	fetch('127.0.0.1:3030/auth/sign-out', {
		headers: { Accept: 'application/json' },
	})
		.then((res) => {
			res.json();
		})
		.then((res) => {})
		.catch(() => {});
};
