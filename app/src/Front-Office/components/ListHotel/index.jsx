import React, { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

import { getHotels } from '../../services/hotel';

import Card from '../Card/';
import CardLoading from '../CardLoading/';

const sortOptions = [
	{ name: 'Best Rating', path: '#', current: true },
	{ name: 'Newest', path: '#', current: false },
	{ name: 'Name: A to Z', path: '#', current: false },
	{ name: 'Name: Z to A', path: '#', current: false },
	{ name: 'Price: Low to High', path: '#', current: false },
	{ name: 'Price: High to Low', path: '#', current: false },
];

function List() {
	const [loading, setLoading] = useState(true);
	const [hotel, setHotel] = useState([]);

	useEffect(() => {
		getHotels()
			.then((result) => {
				if (result.status === 200 && result.data.length) {
					console.log(result);
					setHotel(result.data);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<div className="w-full py-6 px-4 container mx-auto">
				<div className="flex justify-between items-center px-3 py-6">
					<h1 className="text-5xl font-extrabold tracking-tight text-blue-600">
						Hotels
					</h1>
					<div className="flex items-center">
						<Menu as="div" className="relative inline-block text-left z-10">
							{({ open }) => (
								<Fragment>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										<span>Sort</span>
										{open && (
											<FaChevronUp className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-blue-600 group-hover:text-blue-800" aria-hidden="true" />
										)}
										{!open && (
											<FaChevronDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-blue-600 group-hover:text-blue-800" aria-hidden="true" />
										)}
									</Menu.Button>
									<Transition show={open} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
										<Menu.Items static className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="py-1">
												{sortOptions.map((option) => (
													<Menu.Item key={option.name}>
														<button onClick={option.href} className={`w-full block px-4 py-2 text-sm text-left hover:bg-gray-100 ${option.current ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
															{option.name}
														</button>
													</Menu.Item>
												))}
											</div>
										</Menu.Items>
									</Transition>
								</Fragment>
							)}
						</Menu>
					</div>
				</div>
				<div className="">
					<div className="flex flex-row justify-center gap-x-0 lg:gap-x-16">
						<div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
							{loading ? 
								(
                                    <>
                                        {[...Array(6)].map((element, index) => (
                                            <CardLoading key={index} />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {hotel.map((section) => (
                                            <Card key={section._id} id={section._id} image={section.coverImage.path} imageAltText={section.coverImage.alt} languages={section.languages} name={section.name} averagePrice={section.averagePrice} rating={section.rating} reviewsCount={section.reviews.length} />
                                        ))}
                                    </>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default List;
