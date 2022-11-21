import React from 'react'
import { Button, DatePicker, Tag } from 'antd'
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { UserAuth } from '../context/AuthContext';

const Events = () => {
const navigate = useNavigate();
  const { currentUser, user } = UserAuth();
  const userUID = user.uid;

  const [eventsList, setEventsList] = useState([]);
    const [eventsID, setEventsID] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // Listing all events from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setEventsList((eventsList) => [...eventsList, doc.data()]);
                setEventsID((eventsID) => [...eventsID, doc.id]);
            });
        });
        return querySnapshot;
    }, [user]);
    


    function EventComponent() {
        return (
            <div className="event-container">
                {eventsList.map((event, index) => (
            <div className="
            flex flex-col  bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg
                sm:w-auto sm:h-auto
                md:w-auto md:h-auto
                lg:w-auto lg:h-auto
                xl:w-auto xl:h-auto
                py-4 mx-2 my-2
                overflow-scroll
              " key={index}>
                <div className="flex flex-row justify-start px-3 pt-2  rounded-t-lg">
                    <img src="https://i.pravatar.cc/300" alt="student" className='w-24 h-24 rounded-lg ' />
                    <div className="flex flex-col justify-start px-3 pt-2">
                        <h1 className="text-md font-bold text-gray-900 dark:text-white ml-4">
                            {event.title}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-300 ml-4">
                            {event.points} points, {event.location}, {event.startDate}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between px-4 rounded-t-lg">
                    <h1 className="text-sm font-bold text-gray-900 dark:text-white">
                        {event.speaker}
                    </h1>
                </div>
                <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        {event.description}
                    </p>
                </div>
                <div className="flex flex-row justify-between px-4 pt-0  rounded-t-lg gap-5">
                    <div className="flex flex-row justify-start  pt-0  rounded-t-lg gap-5">
                    <Tag color="blue">Mental Health</Tag>
                    <Tag color="cyan">Workshop</Tag>
                    </div>
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded">
                        <Link to={`/events/${eventsID[index]}`}>
                            <a className="text-white">View</a>
                        </Link>
                    </button>

                </div>

            </div>
            ))}
            </div>
        )
    }

    return (
        <>
            <div>
                {/* <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Finding Project</span> Made Easy.</h1> */}
                <div className="flex justify-between  sm:flex-row">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
                    <div className="flex justify-end">
                        <button 
                            onClick={() => navigate('/add-events')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Event
                        </button>
                    </div>
                </div>
                
                <div className=" 
               
        flex flex-row justify-start rounded-t-lg flex-wrap 
        sm:flex-row sm:bg-red-300 sm:justify-start sm:px-4 sm:pt-5 sm:rounded-t-lg sm:flex-wrap
        md:flex-col md:bg-lime-300 md:justify-start md:px-4 md:pt-5 md:rounded-t-lg md:flex-wrap
        lg:flex-row lg:bg-sky-300 lg:justify-start lg:rounded-t-lg lg:flex-wrap
        xl:flex-row xl:bg-gray-300 xl:justify-start xl:rounded-t-lg xl:flex-wrap
        ">
                    <div className="flex flex-row justify-center rounded-t-lg flex-wrap ">
                        <EventComponent />
                    </div>




                </div>
                {/* <main>
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
                    </div>
                </main> */}


            </div>
        </>
    )
}

export default Events