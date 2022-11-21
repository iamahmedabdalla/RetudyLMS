import React, { Children } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {MenuOutlined, BellOutlined, CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const userData = {
  name: 'Ahmed',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const handleCurrent = (path) => {
  return window.location.pathname === path
  if (window.location.pathname === path) {
    return true
  }
  return false
}


const Usernotifications = [
  { name: 'Notification 1', href: '#' },
  { name: 'Notification 2', href: '#' },
  { name: 'Notification 3', href: '#' },
]

const Layout = () => {
  const navigate = useNavigate();
  const { user, logout, userRole } = UserAuth();

  const AdminNavigation = [
    { name: 'Dashboard', href: '/dashboard', current: handleCurrent('/dashboard') },
    { name: 'Messenger', href: '/messenger', current: handleCurrent('/messenger') },
    { name: 'Events', href: '/events', current: handleCurrent('/events') },
    { name: 'Faculties', href: '/faculties', current: handleCurrent('/faculties') },
    { name: 'Users', href: '/users', current: handleCurrent('/users') },
    { name: 'Calender', href: '/calendar', current: handleCurrent('/calendar') },
  ]

  const StudentNavigation = [
    { name: 'Current Classes', href: '/current-classes', current: handleCurrent('/current-classes') },
    { name: 'Messenger', href: '/messenger', current: handleCurrent('/messenger') },
    { name: 'Events', href: '/events', current: handleCurrent('/events') },
    { name: 'Calender', href: '/calendar', current: handleCurrent('/calendar') },
    { name: 'All Subjects', href: '/all-subjects', current: handleCurrent('/all-subjects') },
  ]

  const TeacherNavigation = [
    { name: 'Current Subjects', href: '/current-subject', current: handleCurrent('/current-subject') },
    { name: 'Messenger', href: '/messenger', current: handleCurrent('/messenger') },
    { name: 'Events', href: '/events', current: handleCurrent('/events') },
    { name: 'Calender', href: '/calendar', current: handleCurrent('/calendar') },
    { name: 'Subjects', href: '/subjects', current: handleCurrent('/subjects') },
  ]


  

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className='dark:bg-gray-900 bg-gray-100 h-[calc(100%+2rem)]]'>
        <div className="min-h-full ">
        <Disclosure as="nav" className="bg-gray-800 ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-900">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        
                        {userRole === 'admin' && AdminNavigation.map((item) => (
                          <Link to={item.href} key={item.name} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}>
                            {item.name}
                          </Link>
                        ))}
                        {userRole === 'student' && StudentNavigation.map((item) => (
                          <Link to={item.href} key={item.name} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}>
                            {item.name}
                          </Link>
                        ))}
                        {userRole === 'teacher' && TeacherNavigation.map((item) => (
                          <Link to={item.href} key={item.name} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}>
                            {item.name}
                          </Link>
                        ))}



                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">

                      <Menu.Button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellOutlined className="h-6 w-6" aria-hidden="true" />
                        
                      </Menu.Button>
                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              {Usernotifications.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      
                    </Menu>
                      


                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <p className="block px-4 py-2 mt-3 text-sm text-white
                            ">{user.displayName}</p>
                            <img className="h-8 w-8 rounded-full" src='https://picsum.photos/200' alt="" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* {userNavigation.map((item) => ( */}
                              
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/profile"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <span   
                                  onClick={handleLogout}
                                  className={classNames(active ? 'bg-gray-100 text-red-600' : '', 'block px-4 py-2 text-sm text-gray-700'
                                  
                                  )}
                                  >
                                    Sign out
                                  </span>

                                )}
                              </Menu.Item>

                      
                            {/* ))} */}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <CloseOutlined className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuOutlined className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {userRole === 'admin' &&  AdminNavigation.map((item) => (
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
                  {userRole === 'teacher' && TeacherNavigation.map((item) => (
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
                  {userRole === 'student' && StudentNavigation.map((item) => (
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
                <h1 className="text-white text-center">User</h1>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={userData.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{
                        user ? user.displayName : "User Name"
                      } 
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellOutlined className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <span onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</span>
                    <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Profile</Link>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure> 
        <main className=''>
          <div className="mx-auto max-w-7xl ">
       

           <Outlet  />
            {/* /End replace */}
          </div>
        </main>
      </div>

    </div>
  )
}

export default Layout