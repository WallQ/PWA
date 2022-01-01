import React from 'react';

import { FaStar, FaStarHalf } from 'react-icons/fa';
import StarRating from '../StarRating/';

import Image from '../../assets/images/header/cover-2.jpg';

function Testing() {
	return (
		<div className="flex h-screen bg-gray-300">
            <div className="m-auto">
                <div>
                    <div className="mb-6">
                        <div className="relative w-96 h-64">
                            <div className="absolute w-96 h-64 rounded-lg shadow-md bg-gray-400 animate-pulse">
                            </div>
                        </div>
                        <div className="relative px-4 -mt-16">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <div className="flex items-baseline">
                                    <div class="w-6 h-2 rounded bg-gray-400 animate-pulse"></div>
                                </div>
                                <div class="my-2 w-32 h-2 rounded bg-gray-400 animate-pulse"></div>
                                <div className="inline-flex gap-x-2">
                                    <div class="w-20 h-2 rounded bg-gray-400 animate-pulse"></div>
                                    <div class="w-6 h-2 rounded bg-gray-400 animate-pulse"></div>
                                </div>
                                <div className="mt-2 flex items-center gap-x-2">
                                    <div class="w-24 h-2 rounded bg-gray-400 animate-pulse"></div>
                                    <div class="w-8 h-2 rounded bg-gray-400 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default Testing;
