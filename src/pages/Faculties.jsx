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
import { Alert } from 'antd';
import { UserAuth } from '../context/AuthContext';

const Faculties = () => {

    const navigate = useNavigate();
    const { currentUser, user } = UserAuth();
    const userUID = user.uid;

    const [faculties, setFaculties] = useState([]);
    const [facultyID, setFacultyID] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Listing all faculties from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "faculties"), orderBy("createdAt", "desc"));
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setFaculties((faculties) => [...faculties, doc.data()]);
                setFacultyID((facultyID) => [...facultyID, doc.id]);
            });
        });
        return querySnapshot;
    }, [user]);



    const handleSubmit = async (e) => {
        e.preventDefault();
    }



    console.log(facultyID);








    

    return (
        <>
            <div className="mt-20 sm:mt-0 w-full mx-auto my-16 dark:bg-gray-900 p-10">

                <div className="md:grid  md:gap-6">
                    <div class="md:col-span-1">
                        

                        <button onClick={() => navigate('/add-faculties')} className="bg-blue-400 dark:bg-gray-800 text-white-100 dark:text-gray-100 font-bold py-2 px-4 rounded inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="ml-2">Add Faculty</span>
                        </button>



                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white dark:bg-inherit px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-4 gap-4">
                                        {faculties.map((faculty, index) => (
                                            <div className="
                                        col-span-6 sm:col-span-1 border-2 border-gray-300 rounded-md
                                        w-full h-64
                                        ">
                                                <div className="flex flex-col justify-start items-start bodrder-2 border-gray-900 rounded-md p-4">
                                                    <div className="flex flex-row justify-start items-center w-full">
                                                        <img src="https://i.pravatar.cc/300" alt="student" className='w-16 h-16 rounded-lg ' />
                                                        <div className="flex flex-col justify-center items-start ml-4 ">
                                                            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                {faculty.title ? faculty.title : "Faculty Name Not Found"}
                                                            </h1>
                                                            <p className="text-gray-500 dark:text-gray-400">
                                                                {faculty.head ? faculty.head : "Faculty Head Not Found"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row justify-between px-0 pt-4 py-0 rounded-t-lg  w-full">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {faculty.location ? faculty.location : "Faculty Location Not Found"}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {faculty.enrolledStudents ? faculty.enrolledStudents : "0 Students"}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-row justify-between px-0 pt-4 py-0 rounded-t-lg  w-full">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {faculty.programs ? faculty.programs : "0 Programs"}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                            {faculty.campus ? faculty.campus : "Faculty Campus Not Found"}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-row  items-center justify-center
                                                px-0 pt-4 py-0 rounded-t-lg  w-full mb-4">
                                                        <Link to={`/faculties/${facultyID[index]}`}
                                                            className="text-sm font-bold text-red-500 dark:text-white">
                                                            View Faculty
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

export default Faculties
