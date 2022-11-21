import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';
import { Alert, Button, message, Drawer, Divider, Tabs } from 'antd';
import 'antd/dist/antd.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { data } from 'autoprefixer';
import 'antd/dist/antd.css';
import MyProjects from './MyProjects';
import { async } from '@firebase/util';

const EventsDetails = () => {
    const { id } = useParams();

    const { user } = UserAuth();
    const userUID = user.uid;

    const [participant, setParticipant] = useState(false);

    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const eventDoc = await getDoc(doc(db, "events", id));
                if (eventDoc.exists()) {
                    setEvent({ ...eventDoc.data(), id: eventDoc.id });
                } else {
                    setError("No such document!");
                }
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        getEvent();
    }, [id]);

    const handleJoin = async () => {
        try {
            if (event.participants.includes(userUID)) {
                message.error("You are already a participant");
                return;
            }
            else {
                await updateDoc(doc(db, "events", id), {
                    participants: arrayUnion(userUID),
                });
                message.success("You have joined the event");
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleLeave = async () => {
        try {
            if (event.participants.includes(userUID)) {
                await updateDoc(doc(db, "events", id), {
                    participants: event.participants.filter((participant) => participant !== userUID),
                });
                message.success("You have left the event");
            }
            else {
                message.error("You are not a participant");
                return;
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    

    

    
    return (
        <>
        <div className="events-details">
            {loading && <div>Loading...</div>}
            {error && <Alert message={error} type="error" />}
            
      

        <div className="flex flex-col p-4 dark:text-white bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg">
        <div className="flex flex-col 
        md:flex-row  md:dark:bg-slate-900 
        lg:flex-row  lg:dark:bg-slate-900 
        xl:flex-row  xl:dark:bg-slate-900 
        w-full h-full
        ">
            <div className="flex flex-col justify-center items-center p-4">
                <img src='https://i.pravatar.cc/300' alt="profile" className="rounded-lg w-64 h-64" />
            </div>

            <div className="flex flex-col justify-start items-start p-4 max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {event.title ? event.title : "Event Name Not Found"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {event.description ? event.description : "Event Description Not Found"}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Location : {event.location ? event.location : "Event Location Not Found"}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Date : {event.startDate ? event.startDate : "Event Date Not Found"} -- {event.endDate ? event.endDate : "Event Date Not Found"}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Time : {event.time ? event.time : "Event Time Not Found"} 
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Points : {event.points ? event.points : "Event Points Not Found"} 
                </p>
                <div className="
                lg:hidden xl:hidden md:hidden
                
                ">
                   {event.participants?.includes(userUID) ? (
                    <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLeave}
                    >
                        Leave Event
                        </button>
                        ) : (
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleJoin}
                            >
                                Join Event
                            </button>
                        )}
                </div>

            </div>
            
            <div className=" flex-col justify-end p-4 mx-auto w-1/5 
            hidden lg:flex xl:flex md:flex
            ">
                {event.participants?.includes(userUID) ? (
                    <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLeave}
                    >
                        Leave Event
                        </button>
                        ) : (
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleJoin}
                            >
                                Join Event
                            </button>
                        )}

            </div>
            
            
        </div>
        <div className='dark:text-white'>
        <Tabs defaultActiveKey="1"  >
            <Tabs.TabPane tab="Event Details" key="1" >
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                        Speaker Name: {event.speakers ? event.speakers : "Speaker Name Not Found"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Speaker Desctripton: {event.speakersDescription ? event.speakersDescription : "Speaker Description Not Found"}
                    </p>
                </div>
                
            </Tabs.TabPane>
            <Tabs.TabPane tab="Google Form" key="2">
                <div className="flex flex-col justify-center items-center w-auto h-full">
                    {
                        event.ticketURL ?  <iframe src={event.ticketURL} width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                        : <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                            No Google Form Found
                        </h1>

 
                    }
                    </div>
            </Tabs.TabPane>
        </Tabs>
        </div>
        
        </div>
        </div>
        </>
    
  )
}

export default EventsDetails

{/*  */}