import React from 'react';

import StarRating from '../StarRating/';

import Image from '../../assets/images/header/cover-2.jpg';

function Testing() {
	return (
		<div className="flex h-screen bg-gray-300">
            <div className="m-auto">
                <div className="container">
                    <div className="">
                        <img src={Image} alt={""} className="w-1/2 h-1/2 object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="ml-80 -mt-96">
                        <div className="bg-white py-24 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                                <div className="text-gray-600 text-xs uppercase font-semibold tracking-wider">
                                    PT - EN - ES
                                </div>
                            </div>
                            <h4 className="mt-2 font-semibold text-lg leading-tight truncate">TEST TEST TEST</h4>
                            <div className="inline-flex">
                                <span className="font-sans text-sm font-normal tracking-widest leading-normal text-center text-blue-600">&#36;150</span>
                                <span className="text-gray-600 text-sm">&#177; &#47; day</span>
                            </div>
                            <div className="mt-2 flex items-center">
                                <div className="inline-flex">
                                    <StarRating rating={5} style={`fill-blue-600 w-4 h-4`} />
                                </div>
                                <span className="ml-2 text-gray-600 text-sm">5 Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default Testing;
