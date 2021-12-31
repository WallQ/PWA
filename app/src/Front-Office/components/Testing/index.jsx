import React from 'react';

import { FaStar, FaStarHalf } from 'react-icons/fa';

import Image from '../../assets/images/header/cover-2.jpg';

function Testing() {
	return (
		<div className="flex h-screen bg-gray-300">
            <div className="m-auto">
                <div>
                    <div className="relative w-96 h-64">
                        <img src={Image} alt="" className="absolute object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="relative px-4 -mt-16">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                                <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-lg">NEW</span>
                                <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                                    3 Beds &bull; 2 Baths
                                </div>
                            </div>
                            <h4 className="mt-2 font-semibold text-lg leading-tight truncate">This is a house</h4>
                            <div>
                                $1,900.0
                                <span className="text-gray-600 text-sm">/ wk</span>
                            </div>
                            <div className="mt-2 flex items-center">
                                <FaStar className="fill-teal-800" /><FaStar className="fill-teal-800" /><FaStar className="fill-teal-800" /><FaStar className="fill-teal-800" /><FaStarHalf className="fill-teal-800" />
                                <span className="ml-2 text-gray-600 text-sm">34 Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default Testing;
