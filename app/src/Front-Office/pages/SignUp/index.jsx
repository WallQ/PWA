import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { signUp } from '../../services/auth';

function SignUp() {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const authenticate = () => {
		signUp(name, surname, email, password)
		.then((result) => {
			if(result.auth === true) {
				console.log(result);
				setMessage(result.message);
				<Navigate  to="/" />
			} else if(result.auth === false) {
				console.log(result);
				setMessage(result.message);
			}
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
			{ message && (
				<h1>{message}</h1>
			)}
			<form onSubmit={(e) => handleSubmit(e) }>
				<label htmlFor="Name">Name</label>
				<input type="text" id="Name" name="name" placeholder="Name" value={email} onChange={(e) => setName(e.target.value)} req="true"/>
				<br />
				<label htmlFor="Surname">Surname</label>
				<input type="text" id="Surname" name="surname" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} req="true"/>
				<br />
				<label htmlFor="Email">Email</label>
				<input type="email" id="Email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} req="true"/>
				<br />
				<label htmlFor="Password">Password</label>
				<input type="password" id="Password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} req="true"/>
				<br />
				<input type="submit" value="submit" />
			</form>
		</div>
	);
}

export default SignUp;
