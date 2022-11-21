import React, { useState, useEffect } from 'react'
import { Tabs, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from "../firebase";
import { UserAuth } from '../context/AuthContext'

const CurrentClasses = () => {
    const { TabPane } = Tabs;
    const { currentUser, user } = UserAuth();


    const [currentClasses, setCurrentClasses] = useState([])
    const [currentClassID, setCurrentClassID] = useState([])
    const [todayTutorials, setTodayTutorials] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const getCurrentClasses = async () => {
            try {
                // fetch all classes from db users currentClasses collection
                const q = query(collection(db, "users", user.uid, "currentClasses"));
                const querySnapshot = onSnapshot(q, (query => {
                    query.forEach((doc) => {
                        setCurrentClasses((currentClasses) => [...currentClasses, doc.data()])
                        setCurrentClassID((currentClassID) => [...currentClassID, doc.id])
                    })
                }))
                return querySnapshot
            } catch (error) {
                setError(error.message)
            }
        }
        getCurrentClasses()
    }, [user])


    console.log(user.uid)




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
                <div className="flex flex-col  bg-white dark:border sm:justify-center  dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
                
                sm:w-1/3 sm:h-1/3
                md:w-full md:h-full
                lg:w-auto lg:h-full
                xl:w-auto xl:h-full
                justify-between
                py-4 mx-2 my-2">
                    <div className="flex flex-row justify-start px-3 pt-2 rounded-t-lg ">
                        <img src="https://i.pravatar.cc/300" alt="student" className='w-24 h-24 rounded-lg ' />
                        <div className='flex flex-col justify-end items-between px-4 rounded-lg w-full sm:flex-row'>
                           
                            <div className="flex flex-col justify-start items-start  px-3 pt-2
                                            sm:flex-col sm:justify-start sm:items-start 
                                            md:flex-row md:justify-start md:items-start md:gap-4
                                            lg:flex-row lg:justify-center lg:items-center lg:gap-5
                                            xl:flex-row xl:justify-center xl:items-center xl:gap-5
                                            
                                            ">
                                <h1 className="text-md font-bold text-gray-900 dark:text-white">
                                    Chapter 1: Introduction to C++
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-300 ">
                                    Introduction to Programming
                                </p>
                                <p className="text-sm text-gray-500 dark:text-red-500 ">
                                   Nov 12, 2021 12:00 PM
                                </p>
                            </div>
                            <div className='flex flex-row justify-center items-center w-1/4 pt-0 rounded-t-lg gap-5 mx-auto rounded-lg shadow-lg '>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded">
                                    Submit
                                </button>
                            </div>
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
                    <div className="flex flex-row dark:bg-slate-900 dark:text-white rounded-lg shadow-lg">
                        {currentClasses ? currentClasses?.map((currentClass, index) => (
                            <div className="
                            flex flex-col  bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg                        
                                sm:w-1/3 sm:h-1/3
                                md:w-1/3 md:h-1/3
                                lg:w-1/3 lg:h-1/3
                                xl:w-1/3 xl:h-1/3
                                py-4 mx-2 my-2
                                
                              " key={index}>
                                <div className="flex flex-row justify-start px-3 pt-2 mb-4 rounded-t-lg border-b-2 border-gray-500">
                                    <img src="https://i.pravatar.cc/300" alt="student" className='w-20 h-20 rounded-lg ' />
                                    <div className="flex flex-col justify-start items-start  px-3 pt-2">

                                        <h1 className="text-md font-bold text-gray-900 dark:text-white ml-2">
                                            {currentClass.name ? currentClass.name : "No Name"}
                                        </h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-300 ml-2">
                                            {currentClass.lecturer ? currentClass.lecturer : "Not Assigned"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
                                    <div className="flex flex-row justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                            {currentClass.location ? currentClass.location : "No Location"}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                            {currentClass.time ? currentClass.time + ' P/W' : "No Time"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between px-4 pt-0  mb-4 rounded-t-lg gap-5">
                                    <div className="flex flex-row justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>

                                        <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                            {currentClass.students ? currentClass.students + ' Students' : "0 Student"}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                                        </svg>

                                        <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                            {currentClass.code ? currentClass.code : 'No Code'}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-center items-end px-4 w-72 pt-0 rounded-t-lg gap-5'>
                                    <Link to={`/current-classes/${currentClassID[index]}`}>
                                        <a className="text-sm font-bold text-red-500 dark:text-red">
                                            View Subject
                                        </a>
                                    </Link>
                                </div>



                            </div>
                        )) : <h1> No Classes </h1>}
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
        <div className="flex flex-col ">
            <div className="mb-5 ">
                <SubjectsCard />
                <TutorialsCard />
            </div>
        </div>

    )
}

export default CurrentClasses