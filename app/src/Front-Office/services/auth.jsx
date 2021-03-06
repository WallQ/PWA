const API_URL = '/auth';

export const signUp = async ({ name, surname, email, password }) => {
	try {
		const response = await fetch(`${API_URL}/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, surname, email, password }),
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const signIn = async ({ email, password }) => {
	try {
		const response = await fetch(`${API_URL}/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const signOut = async () => {
	try {
		const response = await fetch(`${API_URL}/sign-out`, {
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

export const signEd = async () => {
	try {
		const response = await fetch(`${API_URL}/signed`, {
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

export const forgotPassword = async ({ email }) => {
	try {
		const response = await fetch(`${API_URL}/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};

export const newPassword = async ({ password }) => {
	try {
		const response = await fetch(`${API_URL}/new-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password }),
		});
		return response.ok
			? await response.json()
			: Promise.reject('Something went wrong!');
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
};
