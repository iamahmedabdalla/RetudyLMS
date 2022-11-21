import React from 'react'
import { DatePicker, Skeleton } from 'antd'
import { UserAuth } from '../context/AuthContext';


const Dashboard = () => {

  const { user } = UserAuth()


  return (
    <>
    {user ? (
      <div className="p-4">
      {/* <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Finding Project</span> Made Easy.</h1> */}
      <div className="flex justify-between  sm:flex-row ">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        
      </div>
      <div className="flex flex-col justify-between  sm:flex-col md:flex-row  lg:flex-row xl:flex-row">
        <div className="
            flex flex-col m-4 bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
            hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
              sm:w-auto sm:h-32
              md:w-1/4 md:h-32
              lg:w-1/4 lg:h-32
              xl:w-1/4 xl:h-32">
          <div className="flex flex-row justify-between px-4 pt-5  rounded-t-lg">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Students</h1>
          </div>
          <div className="flex flex-row justify-between px-3 pt-0  rounded-t-lg">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">13,203</h1>
            <img src="https://i.pravatar.cc/300" alt="student" className='w-10 h-10 rounded-full' />
          </div>
          <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white flex flex-row ">
              2.5% <span className="text-green-500 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                This Month
              </span>
            </h1>
          </div>
        </div>

        <div className="
            flex flex-col m-4 bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
            hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
              sm:w-auto sm:h-32
              md:w-1/4 md:h-32
              lg:w-1/4 lg:h-32
              xl:w-1/4 xl:h-32">
          <div className="flex flex-row justify-between px-4 pt-5  rounded-t-lg">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Teachers</h1>
          </div>
          <div className="flex flex-row justify-between px-3 pt-0  rounded-t-lg">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">548</h1>
            <img src="https://i.pravatar.cc/300" alt="student" className='w-10 h-10 rounded-full' />
          </div>
          <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white flex flex-row ">
              2.5% <span className="text-green-500 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                This Month
              </span>
            </h1>
          </div>
        </div>

        <div className="
            flex flex-col m-4 bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
            hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
              sm:w-auto sm:h-32
              md:w-1/4 md:h-32
              lg:w-1/4 lg:h-32
              xl:w-1/4 xl:h-32">
          <div className="flex flex-row justify-between px-4 pt-5  rounded-t-lg">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Courses</h1>
          </div>
          <div className="flex flex-row justify-between px-3 pt-0  rounded-t-lg">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">47</h1>
            <img src="https://i.pravatar.cc/300" alt="student" className='w-10 h-10 rounded-full' />
          </div>
          <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white flex flex-row ">
              2.5% <span className="text-green-500 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                This Month
              </span>
            </h1>
          </div>
        </div>

        <div className="
            flex flex-col m-4 bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
            hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
              sm:w-auto sm:h-32
              md:w-1/4 md:h-32
              lg:w-1/4 lg:h-32
              xl:w-1/4 xl:h-32">
          <div className="flex flex-row justify-between px-4 pt-5  rounded-t-lg">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Events</h1>
          </div>
          <div className="flex flex-row justify-between px-3 pt-0  rounded-t-lg">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">130</h1>
            <img src="https://i.pravatar.cc/300" alt="student" className='w-10 h-10 rounded-full' />
          </div>
          <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white flex flex-row ">
              2.5% <span className="text-green-500 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                This Month
              </span>
            </h1>
          </div>
        </div>

        

        


      </div>
      <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" >
                <div className="flex flex-col justify-center items-center h-full">
                  
                  <p className="mt-1 text-xl text-gray-500">
                    More analytical charts will be available soon
                  </p>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>


    </div>
  ) : (
    <Skeleton />
  )
}

    </>
  )
}

export default Dashboard



