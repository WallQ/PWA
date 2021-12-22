import React from 'react';

function Loading() {
	return (
		<div className="flex h-screen bg-light">
			<div className="flex items-center justify-center m-auto ">
				<svg
					className="animate-spin -ml-1 mr-3 h-24 w-24"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-90"
						cx="12"
						cy="12"
						r="10"
						stroke="#121212"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-100"
						fill="#edb94a"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<h1 className="ml-12 text-6xl font-sans font-black capitalize text-secondary">
					Loading<span className="text-dark">...</span>
				</h1>
			</div>
		</div>
	);
}

export default Loading;
