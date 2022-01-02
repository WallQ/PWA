import React from 'react';

import { spinner } from '../../utils/icons';

function Loading() {
	return (
		<div className="flex justify-center items-center mx-auto h-screen bg-blue-600">
			{spinner}
			<h1 className="font-sans text-6xl font-black tracking-widest leading-normal text-center text-white mb-0 ml-6">
				Loading<span className="text-dark">...</span>
			</h1>
		</div>
	);
}

export default Loading;
