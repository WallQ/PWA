import React from 'react';

import logo from '../../assets/images/logo.svg';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
	return (
		<div className="w-full py-4 px-4 bg-myDark">
			<div className="flex flex-col md:flex-row justify-between items-center container mx-auto">
				<div className="grow flex-row mb-2 md:mb-0">
					<img src={logo} className="w-12 h-12" alt="logo" />
				</div>
				<div className="grow flex-row mb-2 md:mb-0">
					<span className="text-white">Copyright &copy; {(new Date().getFullYear())}, André & Sérgio</span>
				</div>
				<div className="flex flex-row mb-2 md:mb-0">
					<a href="https://www.facebook.com/" rel="noreferrer" target="_blank" className="">
						<FaFacebook className='social hover:text-blue-700' />
					</a>
					<a href="http://twitter.com/" rel="noreferrer" target="_blank" className="">
						<FaTwitter className='social hover:text-cyan-600' />
					</a>
					<a href="https://linkedin.com/" rel="noreferrer" target="_blank" className="">
						<FaLinkedin className='social hover:text-blue-600' />
					</a>
				</div>
			</div>
		</div>
	);
}

export default Footer;
