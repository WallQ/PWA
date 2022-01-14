import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';

import { getHotels } from '../../services/hotel';
import { sort } from '../../utils/sort';

import Card from '../Card/';
import CardLoading from '../CardLoading/';

function List() {
	const [loading, setLoading] = useState(true);
	const [hotel, setHotel] = useState([]);
	const [selected, setSelected] = useState(sort[0]);

	useEffect(() => {
		getHotels(selected.value)
			.then((result) => {
				if (result.status === 200 && result.data.hotels.length) {
					console.log(result);
					setHotel(result.data.hotels);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [selected]);

	return (
		<>
			<div className="w-full py-6 px-4 container mx-auto">
				<div className="flex justify-between items-center px-3 py-6">
					<h1 className="text-5xl font-extrabold tracking-tight text-blue-600 mb-0">
						Hotels
					</h1>
					<div className="flex items-center">
						<div className="w-44 z-10">				
							<Listbox value={selected} onChange={setSelected}>
								<div className="relative mt-1">
									<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
										<span className="block truncate">{selected.type}</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<HiSelector className="w-5 h-5 fill-blue-600" aria-hidden="true" />
										</span>
									</Listbox.Button>
									<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
										<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{sort.map((sort, sortId) => (
												<Listbox.Option key={sortId} value={sort} className={({ active }) => `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-600'} cursor-default select-none relative py-2 pl-10 pr-4`}>
													{({ selected, active }) => (
														<>
															<span className={`${selected ? 'font-medium' : 'font-normal' } block truncate`}>
																{sort.type}
															</span>
															{selected ? (
																<span className={`${active ? 'text-blue-600' : 'text-blue-600' } absolute inset-y-0 left-0 flex items-center pl-3`}>
																	<HiCheck className="w-5 h-5 fill-blue-600" aria-hidden="true" />
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
					</div>
				</div>
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
		</>
	);
}

export default List;
