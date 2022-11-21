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


const Subjects = () => {
    const navigate = useNavigate();
    const { currentUser, user } = UserAuth();
    const userUID = user.uid;
    const id = useParams();

    const [subjects, setSubjects] = useState([]);
    const [subjectID, setSubjectID] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    // Listing all subjects inside the selected program inside the selected faculty
    useEffect(() => {
        const q = query(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', "programs", id.id, "subjects"), orderBy("createdAt", "desc"));
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setSubjects((subjects) => [...subjects, doc.data()]);
                setSubjectID((subjectID) => [...subjectID, doc.id]);
            });
        });
        return querySnapshot;
    }, [user]);

    console.log(id.id);
    console.log(id.programID);




  
  
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
                            <Link to={`/faculties/JG9Jl14O2aBdc8jTsPzU/programs/${id.id}/add-subject`}>Add Subject</Link>
                        </span>
                    </button>



                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white dark:bg-inherit px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-4 gap-4">
                                    {subjects.map((subject, index) => (
                                        <div className="
                                    col-span-6 sm:col-span-1 border-2 border-gray-300 rounded-md
                                    w-full h-64 flex flex-col justify-start 
                                    ">
                                            <div className="flex flex-col justify-start items-start bodrder-2 border-gray-900 rounded-md p-4">
                                                <div className="flex flex-row justify-start items-center w-full">
                                                    <img src="https://i.pravatar.cc/300" alt="student" className='w-16 h-16 rounded-lg ' />
                                                    <div className="flex flex-col justify-center items-start ml-4 ">
                                                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                                            {subject.title ? subject.title : "subject Name Not Found"}
                                                        </h1>
                                                        <p className="text-gray-500 dark:text-gray-400">
                                                            {subject.lecturers ? subject.lecturers : "Subject Lecturer Not Found"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row justify-between px-0 py-0 rounded-t-lg  w-full">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {subject.time ? subject.time + ' Hours / Week' : "subject hours per week Not Found"}
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {subject.enrolledStudents ? subject.enrolledStudents : "0 Students"}
                                                    </p>
                                                </div>

                                                <div className="flex flex-row justify-between px-0 py-0 rounded-t-lg  w-full">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {subject.code ? subject.code : "0 Code"}
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {subject.location ? subject.location : "Subject Location Not Found"}
                                                    </p>
                                                </div>

                                                <div className="flex flex-row  items-center justify-center
                                            px-0 pt-4 py-0 rounded-t-lg  w-full mb-4">
                                                    <Link to={`/faculties/JG9Jl14O2aBdc8jTsPzU/programs/${id.id}/subjects/${subjectID[index]}`}
                                                        className="text-sm font-bold text-red-500 dark:text-red-400">
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
    );
}

export default Subjects