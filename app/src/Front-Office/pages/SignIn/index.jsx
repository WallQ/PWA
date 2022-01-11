import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { FaGithub, FaGoogle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

import useAuthenticated from '../../hooks/authenticated';
import { signIn } from '../../services/auth';

function SignIn() {
	//let navigate = useNavigate();
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const [email, setEmail] = useState(cookies.RememberMe ? cookies.RememberMe.email : '');
	const [password, setPassword] = useState(cookies.RememberMe ? cookies.RememberMe.password : '');
	const [rememberMe, setRememberMe] = useState(true);
	const [message, setMessage] = useState('');

	const { authenticated } = useAuthenticated();
	if(authenticated){
		return <Navigate to='/'/>
		//navigate('/test', { state: {message: 'Hello'} })
	}

	const authenticate = () => {
		signIn({ email, password })
			.then((result) => {
				if (result.auth === true) {
					setRedirect(true);
				}
				console.log(result);
				setMessage(result.message);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if(rememberMe) {
			setCookie('RememberMe', { email, password }, { path: '/' });
		} else {
			removeCookie('RememberMe');
		}
		authenticate();
	};

    if(redirect){
        return <Navigate to='/'/>
    }

	return (
		<div>
			<div className="relative min-h-screen flex flex-col sm:justify-center items-center">
				<div className="relative sm:max-w-sm w-full">
					<div className="card bg-cyan-400 w-full h-full rounded-3xl absolute transform -rotate-6 shadow-lg shadow-cyan-400/30"></div>
					<div className="card bg-green-400 w-full h-full rounded-3xl absolute transform rotate-6 shadow-lg shadow-green-400/30"></div>
					<div className="relative w-full rounded-3xl px-6 py-6 bg-white shadow-md">
						<h1 htmlFor="loginForm" className="block font-sans text-6xl font-extrabold tracking-wide leading-normal text-center text-blue-600 capitalize align-middle whitespace-normal">
							Sign In
						</h1>
						{message && (
							<div className="flex flex-row bg-red-100 rounded-lg p-4 mb-4 text-base text-red-700 justify-between items-center" role="alert">
								<div className="inline-flex items-center">
									<FaExclamationTriangle className="w-5 h-5 fill-red" />
									<span className="ml-2"><span className="font-medium">Error!</span> {message}</span>
								</div>								
								<FaTimes className="w-5 h-5 fill-red" onClick={() => setMessage('')}/>
							</div>
						)}
						<form onSubmit={handleSubmit} className="mt-6" id="loginForm">
							<div className="flex flex-col gap-y-4">
								<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="inline-flex px-4 py-2 w-full rounded-md bg-white border border-gray-300 font-sans text-base font-medium tracking-widest leading-normal text-left text-gray-600 normal-case align-middle whitespace-normal focus:outline-none ring-0 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" required={true} />         
								<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="inline-flex px-4 py-2 w-full rounded-md bg-white border border-gray-300 font-sans text-base font-medium tracking-widest leading-normal text-left text-gray-600 normal-case align-middle whitespace-normal focus:outline-none ring-0 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" required={true} />                           
							</div>
							<div className="flex flex-row mt-4">
								<label htmlFor="rememberMe" className="inline-flex items-center w-full cursor-pointer">
									<input type="checkbox" name="remember" value={rememberMe} defaultChecked={rememberMe} onChange={() => setRememberMe(!rememberMe)} id="rememberMe" className="form-checkbox text-blue-600 rounded bg-white border border-gray-300 focus:outline-none ring-0 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer" />
									<span className="ml-2 text-sm text-gray-600">
										Remember me
									</span>
								</label>
								<div className="w-full text-right">     
									<Link to="/forgot-password" className="font-sans text-xs font-normal tracking-widest leading-normal text-center text-blue-600 hover:text-blue-800 transition-colors normal-case align-middle whitespace-normal underline" href="#">
										Forgot your password?
									</Link>                                  
								</div>
							</div>
							<div className="flex flex-row mt-6">
								<button className={`inline-flex items-center justify-center w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-800 font-sans text-xl font-bold tracking-widest leading-normal text-center text-white capitalize align-middle whitespace-normal shadow-lg shadow-blue-600/50 focus:outline-none ${loading ? '' : 'duration-500 transform hover:scale-105'}`}>
									{loading ?
										<>
											<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											<span>Processing...</span>
										</>
									: <><span>Submit</span></>}
								</button>
							</div>
							<div className="flex flex-row mt-6 items-center text-center">
								<hr className="border-gray-300 border-1 w-full rounded-md" />
								<label className="block w-full font-sans text-sm font-medium tracking-widest leading-normal text-center text-gray-600 capitalize align-middle whitespace-normal">
									Sing In With
								</label>
								<hr className="border-gray-300 border-1 w-full rounded-md" />
							</div>
							<div className="flex mt-6 justify-center w-full gap-x-4">
								<button className="inline-flex items-center px-4 py-2 bg-neutral-700 hover:bg-neutral-900 rounded-xl font-sans text-base font-medium tracking-widest leading-normal text-center text-white capitalize align-middle whitespace-normal cursor-pointer shadow-lg shadow-neutral-900/50 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
									<FaGithub className="mr-2 w-5 h-5 fill-white" />
									<span>GitHub</span>
								</button>
								<button className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-700 rounded-xl font-sans text-base font-medium tracking-widest leading-normal text-center text-white capitalize align-middle whitespace-normal cursor-pointer shadow-lg shadow-red-900/50 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
									<FaGoogle className="mr-2 w-5 h-5 fill-white" />
									<span>Google</span>
								</button>
							</div>
							<div className="mt-6">
								<div className="flex justify-center items-center">
									<Link to="/sign-up" className="font-sans text-sm font-normal tracking-widest leading-normal text-center text-blue-600 hover:text-blue-800 normal-case align-middle whitespace-normal transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
										I don't have an account
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
