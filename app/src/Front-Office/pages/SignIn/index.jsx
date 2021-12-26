import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { signIn } from '../../services/auth';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const authenticate = () => {
		signIn(email,password)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		authenticate();
	}

	return (
		<div>
			{ error && (
				<h1>{error}</h1>
			)}
			<form onSubmit={(e) => handleSubmit(e) }>
				<label htmlFor="Email">Email</label>
				<input type="email" id="Email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				<label htmlFor="Password">Password</label>
				<input type="password" id="Password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<input type="submit" value="submit" />
			</form>
		</div>
	);
}

export default SignIn;
