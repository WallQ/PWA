import React from 'react';

import { spinner } from '../../utils/icons';

function Loading() {
	return (
		<div className="flex justify-center items-center mx-auto h-screen bg-white">
			{spinner}
			<h1 className="text-6xl font-sans font-black capitalize text-secondary mb-0 ml-6">
				Loading<span className="text-dark">...</span>
			</h1>
		</div>
	);
}

export default Loading;
