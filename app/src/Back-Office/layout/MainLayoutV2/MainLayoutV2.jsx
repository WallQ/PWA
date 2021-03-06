import React, { useState, useEffect } from 'react';
import { Navigate, Link, NavLink } from 'react-router-dom';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Outlet } from 'react-router-dom';
import { Select } from 'antd';
import Selecthotelworking from './SelectHotelWorking/SelectHotelWorking';

const actionType = {"AUTENTICATED": 0, "REDIRECT": 1};

const MainLayoutV2 = (props) => {

  //LOGIN
  const [me, setMe] = useState({auth: false, roles: []})
  const [action, setAction] = useState(actionType.AUTENTICATED);

	const logout = () => {
    //console.log("lets logout")
		fetch('/auth/sign-out', {
			headers: { Accept: 'application/json' },
		})
			.then((response) => {
				response.json();
			})
			.then((response) => {
				if (response.logout) {
					setMe({auth: false, roles: []});
          setAction(actionType.REDIRECT);
				}
			})
			.catch(() => {
				setMe({auth: false, roles: []});
        setAction(actionType.REDIRECT);
			});
	};

  const getMe = () =>{
    fetch('/auth/signed', {
			headers: { Accept: 'application/json' },
		})
			.then((response) => response.json())
			.then((response) => {
        console.log("API ME :", response)
        //console.log("existe no array", response.roles.some(r=> ['Admin','Director','Employee'].includes(r)))

        if(response.roles.some(r=> ['Admin'].includes(r))){
          navigation.splice(1,0,{ name: 'Hotels', href: '/admin/hotels', current: false })
        }
        
        if(response.roles.some(r=> ['Admin','Director','Employee'].includes(r))){
          setMe({auth: response.auth, roles: response.roles});
        }else{
          logout();
          setAction(actionType.REDIRECT)
        }
      })
			.catch(() => {
        setAction(actionType.REDIRECT)
			});
  }
  

  //Definições template
  const user = {
    name: 'PETER',
    email: 'peter@example.com',
    imageUrl:
      'https://lledogrupo.com/wp-content/uploads/2018/04/user-img-1.png',
  }
  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/admin', current: false },
    { name: 'Room Types', href: '/admin/roomTypes', current: false },
    { name: 'Packs', href: '/admin/packs', current: false },
    { name: 'Rooms', href: '/admin/rooms', current: false },
    { name: 'Books', href: '/admin/books', current: false },
  ]);
  
  const userNavigation = [
    { name: 'Sign out', href: '#', onClick: logout },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  //Fimm

	useEffect(() => {
    
		getMe();
	}, []);

  if(action == actionType.REDIRECT){
    return <Navigate to={'login'}/>
  }

  if(me.auth && action != actionType.REDIRECT){
    if(!me.auth || !me.roles.some(r=> ['Admin','Director','Employee'].includes(r))){
	    return <Navigate to={'./login'}/>
	  }

    if(me.auth && me.roles.some(r=> ['Admin','Director','Employee'].includes(r))){

      return (
        <>
          <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
    
                          <Selecthotelworking setHotelID = {props.setHotelID}></Selecthotelworking>
    
                           {/*<button
                            type="button"
                            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
    
                          Profile dropdown */}
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        onClick={item.onClick}
                                        href={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
    
                  <Disclosure.Panel className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{user.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
                        
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900"></h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  
                <Outlet/>

                {/*<div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                 /End replace */}
              </div>
            </main>
          </div>
        </>
      )
    }

  }
  else{
    return <></>
  }
  
}
export default MainLayoutV2;


