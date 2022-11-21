import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full dark:text-white dark:bg-inherit">
    <h1 className="text-9xl font-bold text-blue-500 ">404</h1>
    <h2 className="text-7xl p-5 font-bold dark:text-red-500">Page Not Found </h2>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-inherit
     dark:text-white dark:hover:bg-inherit dark:hover:text-white
      dark:border-white dark:hover:border-white
      hover:border-blue-700 border-blue-500 border-2
     ">
      Go Home
    </button>
    
  </div>

    
  )
}

export default PageNotFound