import React from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

function Header({ bgImage }) {
	return (
		<div>
			<div className="w-screen h-screen max-w-full max-h-full bg-fixed bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center" style={{ backgroundImage: `url(${bgImage})` }}>
				<div className="m-auto">
					<div className="flex flex-col md:flex-row justify-between items-center mt-3">
						<div className="flex flex-col md:flex-row">
							<input type="date" name="" id="" className='mr-0 md:mr-5 mb-5 md:mb-0'/>
							<input type="date" name="" id="" className='mr-0 md:mr-5 mb-5 md:mb-0'/>
							<input type="date" name="" id="" className='mr-0 md:mr-5 mb-5 md:mb-0'/>
						</div>
						<button type="submit" value="submit" className="btn-primary">
							<FaSearch className="btn-primary-icon" />
							Sign Up
						</button>
					</div>
				</div>
				<div className="flex justify-center items-center animate-bounce">
					<FaChevronDown className="h-8 w-8 text-white" />
				</div>
			</div>
		</div>
	);
}

export default Header;
