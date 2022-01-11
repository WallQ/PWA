import React from 'react'
import { Link } from 'react-router-dom';

import StarRating from '../StarRating/';

function Card({ id, image, imageAltText, languages, name, averagePrice, rating, reviewsCount }) {
    return (
        <>
            <Link to={`/hotel/${id}/`}>
                <div className="mb-6 transition ease-in-out delay-150 hover:scale-105">
                    <div className="relative w-96 h-64">
                        <img src={`http://127.0.0.1:3030/public/assets/images/${image}`} alt={imageAltText} className="absolute w-96 h-64 object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="relative px-4 -mt-16">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                                {/* <span className="inline-block px-2 bg-blue-600 rounded-md font-sans text-xd font-normal tracking-normal leading-normal text-center text-white normal-case align-middle whitespace-normal">NEW</span> */}
                                <div className="text-gray-600 text-xs uppercase font-semibold tracking-wider">
                                {languages.map((option) => (
                                    <span key={option._id} className="after:content-['\2022'] last:after:content-['']"> {option.initials} </span>
                                ))}
                                </div>
                            </div>
                            <h4 className="mt-2 font-semibold text-lg leading-tight truncate">{name}</h4>
                            <div className="inline-flex">
                                <span className="font-sans text-sm font-normal tracking-widest leading-normal text-center text-blue-600">&#36;{averagePrice}</span>
                                <span className="text-gray-600 text-sm">&#177; &#47; day</span>
                            </div>
                            <div className="mt-2 flex items-center">
                                <div className="inline-flex">
                                    <StarRating rating={rating} style={`fill-blue-600 w-4 h-4`} />
                                </div>
                                <span className="ml-2 text-gray-600 text-sm">{reviewsCount} Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card
