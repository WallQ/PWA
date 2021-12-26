import React from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

function Header({ title, titleWord, subTitle, bgImage, searchBar, button }) {
	return (
		<div>
			<div className="w-screen h-screen max-w-full max-h-full bg-fixed bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center" style={{ backgroundImage: `url(${bgImage})` }}>
				<div className="m-auto">
					{ title && (
						<h1 className="text-7xl font-sans font-black capitalize text-white text-center bg-clip-text bg-gradient-to-r from-indigo-500 mb-3">
							{title}
							{ titleWord && (
								<span className="ml-3 before:block before:absolute before:-inset-1 before:skew-y-3 before:bg-blue-600 relative inline-block">
									<span className="relative text-white">{ titleWord }</span>
								</span>
							)}
						</h1>
					)}
					{ subTitle && (
						<h6 className="text-3xl font-sans font-black capitalize text-white text-center text-shadow-lg">
							{subTitle}
						</h6>
					)}
					{ searchBar && (
						<div className={`flex flex-col md:flex-row justify-between items-center ${titleWord ? 'mt-6' : 'mt-6'}`}>
							<div className="flex flex-col md:flex-row">
								<input type="date" name="" id="" className='mr-0 md:mr-5 mb-5 md:mb-0 h-10 px-3 ring-0 focus:outline-none text-blue-700 rounded-lg font-sans text-base font-medium text-left'/>
								<input type="date" name="" id="" className='mr-0 md:mr-5 mb-5 md:mb-0 h-10 px-3 ring-0 focus:outline-none text-blue-700 rounded-lg font-sans text-base font-medium text-left'/>
								<input type="date" name="" id="" className='mr-0 md:mr-5 mb-5 md:mb-0 h-10 px-3 ring-0 focus:outline-none text-blue-700 rounded-lg font-sans text-base font-medium text-left'/>
							</div>
							<button type="submit" value="submit" className="btn-primary bg-blue-600 hover:bg-blue-700">
								<FaSearch className="w-5 h-5 mr-2 fill-white" />
								Sign Up
							</button>
						</div>
					)}
				</div>
				{ button && (
					<div className="flex justify-center items-center animate-bounce">
						<FaChevronDown className="h-8 w-8 text-white" />
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
