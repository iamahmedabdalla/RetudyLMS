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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { UserAuth } from '../context/AuthContext';

const Programs = () => {
    const navigate = useNavigate();
    const { currentUser, user } = UserAuth();
    const userUID = user.uid;
    const id = useParams();

    const [programs, setPrograms] = useState([]);
    const [programID, setProgramID] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Listing all programs from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "faculties", id.id, "programs"), orderBy("createdAt", "desc"));
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPrograms((programs) => [...programs, doc.data()]);
                setProgramID((programID) => [...programID, doc.id]);
            });
        });
        return querySnapshot;
    }, [user]);



  return (
    <>
            <div className="mt-20 sm:mt-0 w-full mx-auto my-16 dark:bg-gray-900">

                <div className="md:grid  md:gap-6">
                    <div class="md:col-span-1">
                        

                        <button className="bg-blue-400 dark:bg-gray-800 text-white-100 dark:text-gray-100 font-bold py-2 px-4 rounded inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="ml-2">
                                <Link to={`/faculties/${id.id}/add-program`}>Add Program</Link>
                            </span>
                        </button>



                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white dark:bg-inherit px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-4 gap-4">
                                        {programs.map((program, index) => (
                                            <div className="
                                        col-span-6 sm:col-span-1 border-2 border-gray-300 rounded-md
                                        w-full h-64
                                        ">
                                                <div className="flex flex-col justify-start items-start bodrder-2 border-gray-900 rounded-md p-4">
                                                    <div className="flex flex-row justify-start items-center w-full">
                                                        <img src="https://i.pravatar.cc/300" alt="student" className='w-16 h-16 rounded-lg ' />
                                                        <div className="flex flex-col justify-center items-start ml-4 ">
                                                            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                {program.title ? program.title : "program Name Not Found"}
                                                            </h1>
                                                            <p className="text-gray-500 dark:text-gray-400">
                                                                {program.head ? program.head : "program Head Not Found"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row justify-between px-0 pt-4 py-0 rounded-t-lg  w-full">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {program.location ? program.location : "program Location Not Found"}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {program.enrolledStudents ? program.enrolledStudents : "0 program"}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-row justify-between px-0 pt-4 py-0 rounded-t-lg  w-full">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {program.programs ? program.programs : "0 Programs"}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {program.campus ? program.campus : "Faculty Campus Not Found"}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-row  items-center justify-center
                                                px-0 pt-4 py-0 rounded-t-lg  w-full mb-4">
                                                        <Link to={`/faculties/${id.id}/programs/${programID[index]}`}
                                                            className="text-sm font-bold text-red-500 dark:text-white">
                                                            View program
                                                        </Link>

                                                    </div>


                                                </div>

                                            </div>

                                        ))}








                                    </div>
                                </div>

                            </div>
                    </div>
                </div>

            </div>

        </>
  )
}

export default Programs

