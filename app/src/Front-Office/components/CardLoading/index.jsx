import React from 'react';

function CardLoading() {
	return (
		<>
			<div className="mb-6">
				<div className="relative w-96 h-64">
					<div className="absolute w-96 h-64 rounded-lg shadow-md bg-gray-400 animate-pulse"></div>
				</div>
				<div className="relative px-4 -mt-16">
					<div className="bg-white p-4 rounded-lg shadow-lg">
						<div className="flex items-baseline">
							<div className="w-6 h-2 rounded bg-gray-400 animate-pulse"></div>
						</div>
						<div className="my-2 w-32 h-2 rounded bg-gray-400 animate-pulse"></div>
						<div className="inline-flex gap-x-2">
							<div className="w-20 h-2 rounded bg-gray-400 animate-pulse"></div>
							<div className="w-6 h-2 rounded bg-gray-400 animate-pulse"></div>
						</div>
						<div className="mt-2 flex items-center gap-x-2">
							<div className="w-24 h-2 rounded bg-gray-400 animate-pulse"></div>
							<div className="w-8 h-2 rounded bg-gray-400 animate-pulse"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CardLoading;
