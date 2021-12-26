import React from 'react';
import { useEffect, useState } from 'react';

import { FaChevronUp } from 'react-icons/fa';

function Scroll() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);
	return (
		<div className="fixed bottom-2 right-2">
			<button type="button" onClick={scrollToTop} className={`p-3 rounded-full shadow-sm text-white bg-blue-600 ease-linear duration-500 animate-bounce ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
				<FaChevronUp className="w-6 h-6" />
			</button>
		</div>
	);
}

export default Scroll;
