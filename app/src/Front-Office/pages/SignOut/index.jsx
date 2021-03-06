import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { signOut } from '../../services/auth';

function SignOut() {
	useEffect(() => {
		signOut()
			.then((result) => {
				if (result.status === 200 && result.auth === false) {
					console.log(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return <Navigate to="/" />;
}

export default SignOut;
