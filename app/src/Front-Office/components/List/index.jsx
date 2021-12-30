import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { FaTimes, FaChevronDown, FaFilter, FaPlus, FaMinus } from 'react-icons/fa';

import { getHotel } from '../../services/hotel';
import bgImage3 from '../../assets/images/header/cover-3.webp';

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
];

const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
];

const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};


function List() {
	const [loading, setLoading] = useState(true);
	const [hotel, setHotel] = useState([]);
	const [error, setError] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

	useEffect(() => {
		getHotel()
			.then((result) => {
				if (result.status === 200) {
                    console.log(result);
					setHotel(result.data);
					setLoading(false);
				}
			})
			.catch((error) => {
                console.error(error);
				setError(error);
			});
	}, []);
	return (
        <div>
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-50 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                        <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-blue-600">Filters</h2>
                                <button type="button" className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400" onClick={() => setMobileFiltersOpen(false)} >
                                    <FaTimes className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <form className="mt-4 border-t border-gray-200">
                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <div>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                        <FaMinus className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                        <FaPlus className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                        <input id={`filter-mobile-${section.id}-${optionIdx}`} name={`${section.id}[]`} defaultValue={option.value} type="checkbox" defaultChecked={option.checked} className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                                                        <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-500">
                                                            {option.label}
                                                        </label>
                                                        </div>
                                                    ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </div>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
            <main className="w-full container mx-auto py-28 px-4">
                <div className="flex items-baseline justify-between relative">
                    <h1 className="text-5xl font-extrabold tracking-tight text-blue-600">Hotels</h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left z-10">
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <FaChevronDown className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-blue-600 group-hover:text-blue-800" aria-hidden="true" />
                                </Menu.Button>
                            </div>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }) => (
                                                    <a href={option.href} className={classNames(option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm' )}>
                                                        {option.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <button type="button" className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                            <FaFilter className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <div className="flex flex-row justify-center gap-x-0 lg:gap-x-16">
                        <div className="flex flex-column basis-0 lg:basis-1/4">
                            <form className="hidden lg:block w-full">
                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <div>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-blue-600 hover:text-blue-800">
                                                        <span className="font-semibold text-black">{section.name}</span>
                                                        <span className="flex items-center">
                                                            {open ? (
                                                                <FaMinus className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <FaPlus className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input id={`filter-${section.id}-${optionIdx}`} name={`${section.id}[]`} defaultValue={option.value} type="checkbox" defaultChecked={option.checked} className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                                                                <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </div>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </div>
                        <div className="flex flex-wrap basis-3/4 justify-center">
                            {hotel.map((section) => (
                                <div key={hotel.id} className="w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-500 transform transition cursor-pointer">
                                    <img src={bgImage3} alt="" />
                                    <div className="p-5">
                                        <h1 className="text-2xl font-bold truncate">{section.name}</h1>
                                        <p className="mt-2 text-lg font-semibold text-gray-600 truncate">{section.name}</p>
                                        <p className="mt-1 text-gray-500 font-sans test">{section.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default List;
