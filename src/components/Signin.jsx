import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { message } from 'antd';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn, error } = UserAuth();
  const { userRole } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-inherit">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto dark:bg-inherit"
            src="https://tailwindui.com/img/logos/mark.svg?color=sky&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
           Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            or Create a new account
            <Link to='/signup' className="font-medium text-sky-600 hover:text-sky-500">
              {' '}here
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm 
                dark:bg-inherit dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400
                mb-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm
                dark:bg-inherit dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400 mb-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-sky-500 group-hover:text-sky-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        {
          error && <p className="text-red-500 text-center">{error}</p>
        }
      </div>
    </div>
  </>
  );
};

export default Signin;
