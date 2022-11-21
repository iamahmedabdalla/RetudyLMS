import { Card } from 'antd'
import React from 'react'
import FacultiesData from './Faculties'
import { Tabs, Tag } from 'antd'


const Subject = () => {

    const { TabPane } = Tabs;

    function SubjectComponent() {
        return (
            <div className="
            flex flex-col  bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
            hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
        
                sm:w-1/3 sm:h-1/3
                md:w-1/3 md:h-1/3
                lg:w-1/3 lg:h-1/3
                xl:w-1/3 xl:h-1/3
                py-4 mx-2 my-2
                
              ">
                <div className="flex flex-row justify-start px-3 pt-2  rounded-t-lg border-b-2 border-gray-500">
                    <img src="https://i.pravatar.cc/300" alt="student" className='w-24 h-24 rounded-lg ' />
                    <div className="flex flex-col justify-start items-start  px-3 pt-2">
                        <h1 className="text-md font-bold text-gray-900 dark:text-white ml-4">
                            Introduction to Programming
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-300 ml-4">
                            Dr. Mohd. Fauzi Bin Mohd. Yusof
                        </p>
                    </div>
                </div>

                <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                        5 Programs
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">KL Kuching</p>

                </div>
                <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                        5 Programs
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">KL Kuching</p>

                </div>
                <div className='flex flex-row justify-center items-end px-4 w-72 pt-0 rounded-t-lg gap-5'>
                    <p className="text-sm font-bold   text-red-900 dark:text-red">
                        View Subject
                    </p>
                </div>
                
                

            </div>
        )
    }

    function TutorialCard() {
        return (
            <>
            {/* <div className="flex flex-col justify-center items-center p-4">
                <img src='https://i.pravatar.cc/300' alt="profile" className="rounded-lg w-16 h-616" />
            </div>

            <div className="flex flex-col justify-start items-start p-4 max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Chapter 1: 
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                Introduction to Programming
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                12/12/2021 12:00 PM
                </p>
                
                
            </div> */}
            <div className="flex flex-col  bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
                
                sm:w-1/3 sm:h-1/3
                md:w-full md:h-full
                lg:w-auto lg:h-full
                xl:w-auto xl:h-full
                justify-between
                py-4 mx-2 my-2">
                <div className="flex flex-row justify-start px-3 pt-2  rounded-t-lg ">
                    <img src="https://i.pravatar.cc/300" alt="student" className='w-24 h-24 rounded-lg ' />
                    <div className="flex flex-col justify-center items-center  px-3 pt-2
                        sm:flex-col sm:justify-start sm:items-start
                        md:flex-col md:justify-start md:items-start
                        lg:flex-row lg:justify-center lg:items-center
                        xl:flex-row xl:justify-center xl:items-center
                        

                    ">
                        <h1 className="text-md font-bold text-gray-900 dark:text-white ml-4">
                            Chapter 1: Introduction to C++
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-300 ml-4">
                            Introduction to Programming
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 ml-4">
                            12/12/2021 12:00 PM
                        </p>
                        

                    </div>
                    <div className='flex flex-row justify-center items-center w-1/2 pt-0 rounded-t-lg gap-5 mx-auto 
                    
                    '>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Submit 
                    </button>
                    </div>
                </div>


                </div>
                

            </>
        )
    }


    function SubjectsCard() {
        return (
            <>
               <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4"> Subjects </h1>
                <div className="overflow-x-auto ">
                    <div className="flex flex-row">
                        <SubjectComponent />
                    </div>
                </div>
            </>
        )
    }

    function TutorialsCard() {
        return (
            <>
               <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4"> Today's Tutorials </h1>
                <div className="overflow-x-auto ">
                    <div className="flex flex-col">
                        <TutorialCard />
                        <TutorialCard />
                    </div>
                </div>
            </>
        )
    }
    



    return (
        <>
            <div className="flex flex-col ">
                <div className="mb-5 ">
                    <SubjectsCard />
                    <TutorialsCard />
                </div>
            </div>

        </>
    )
}

export default Subject