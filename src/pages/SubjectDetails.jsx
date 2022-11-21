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
import TabPane from 'antd/lib/tabs/TabPane';

const SubjectDetails = () => {
    const { id } = useParams();

    const { user } = UserAuth();
    const userUID = user.uid;

    const [subjectdata, setSubjectdata] = useState([]);
    const [subjectMenus, setSubjectMenus] = useState([]);
    const [overviews, setOverviews] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [exams, setExams] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);



    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    useEffect(() => {
        const getSubjectdata = async () => {
            try {
                const subjectDoc = await getDoc(doc(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id));
                if (subjectDoc.exists()) {
                    setSubjectdata({ ...subjectDoc.data(), id: subjectDoc.id });
                } else {
                    setError("No such document!");
                }
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getOverviews = async () => {
            try {
                const subjectOverview = await getDocs(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id, 'overviews'));
                const overviewsData = subjectOverview.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setOverviews(overviewsData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        const getLectureNotes = async () => {
            try {
                const subjectLectures = await getDocs(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id, 'lectures'));
                const lectureData = subjectLectures.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setLectures(lectureData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getTutorialNotes = async () => {
            try {
                const subjectTutorials = await getDocs(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id, 'tutorials'));
                const tutorialData = subjectTutorials.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setTutorials(tutorialData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getAssignmentNotes = async () => {
            try {
                const subjectAssignments = await getDocs(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id, 'assignments'));
                const assignmentData = subjectAssignments.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAssignments(assignmentData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getExamNotes = async () => {
            try {
                const subjectExams = await getDocs(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id, 'PastExams'));
                const examData = subjectExams.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setExams(examData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getQuizNotes = async () => {
            try {
                const subjectQuizzes = await getDocs(collection(db, "faculties", 'JG9Jl14O2aBdc8jTsPzU', 'programs', 'YX5vCdt3rWqYZsr6AsLa', 'subjects', id, 'quizzes'));
                const quizData = subjectQuizzes.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setQuizzes(quizData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };


        getSubjectdata();
        getOverviews();
        getLectureNotes();
        getTutorialNotes();
        getAssignmentNotes();
        getExamNotes();
        getQuizNotes();

    }, [id]);


    function lectureClik(key, event) {
        console.log(key);
        if (key == "1") {
            alert("1");
        }
    }




    function OverviewsMenus () {
        return (
            <>
            <Tabs defaultActiveKey="1" onChange={lectureClik}>
                {overviews.map((overview) => (
                    <TabPane tab={overview.name} key={overview.id}>
                        <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                        {overview.data}
                        </p>
                    </TabPane>
                ))}
            </Tabs>
            </>
        )
    }

  
    function LectureMenus (){
        return (
            <>
            <Tabs defaultActiveKey="1" onChange={lectureClik}>
                {lectures.map((lecture) => (
                    <TabPane tab={lecture.name} key={lecture.id}>
                        <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                        {lecture.data}
                        </p>
                    </TabPane>
                ))}
            </Tabs>
            </>
        )
    }

    function TutorialMenus (){
        return (
            <>
            <Tabs defaultActiveKey="1" onChange={lectureClik}>
                {tutorials.map((tutorial) => (
                    <TabPane tab={tutorial.name} key={tutorial.id}>
                        <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                        {tutorial.data}
                        </p>
                    </TabPane>
                ))}
            </Tabs>
            </>
        )
    }

    function AssignmentsMenus (){
        return (
            <>
            <Tabs defaultActiveKey="1" onChange={lectureClik}>
                {assignments.map((assignment) => (
                    <TabPane tab={assignment.name} key={assignment.id}>
                        <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                        {assignment.data}
                        </p>
                    </TabPane>
                ))}
            </Tabs>

            </>
        )
    }

    function QuizzesMenus (){
        return (
            <>
            <Tabs defaultActiveKey="1" onChange={lectureClik}>
                {quizzes.map((quiz) => (
                    <TabPane tab={quiz.name} key={quiz.id}>
                        <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                        {quiz.data}
                        </p>
                    </TabPane>
                ))}
            </Tabs>
            </>
        )
    }

    function ExamsMenus (){
        return (
            <>
            <Tabs defaultActiveKey="1" onChange={lectureClik}>
                {exams.map((exam) => (
                    <TabPane tab={exam.name} key={exam.id}>
                        <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                        {exam.data}
                        </p>
                    </TabPane>
                ))}
            </Tabs>
            </>
        )
    }
    
    function Forum (){
        return (
            <>
            <div className="flex flex-col w-full h-screen bg-zinc-300 dark:bg-zinc-400 ">
                Forum here
            </div>
            </>
        )
    }

    function UploadedMaterials () {
        return (
            <>
            <div className="overflow-x-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Type</th>
                                        <th className="py-3 px-6 text-center">Size</th>
                                        <th className="py-3 px-6 text-center">Date</th>
                                        <th className="py-3 px-6 text-center">Re-Upload</th>
                                        <th className="py-3 px-6 text-center">Download</th>
                                        <th className="py-3 px-6 text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light dark:text-white">
                                    <UserData />
                                </tbody>
                            </table>
                        </div>
            </>
        )
    }

   function UserData () {
    return (
        <>
        <tr className="border-b">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                                </div>
                                <span className="font-medium">
                                    No Name
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                                <span>
                                    Pdf File
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                                <span >
                                    1.2 MB
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span >
                                1/1/2021
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>

                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 16v-4a3 3 0 016 0v4m-3-8a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                
                            </div>
                        </td>
                    </tr>

        </>
    )
   }




    return (
        <div className='dark:bg-gray-800 dark:text-white w-full'>
            

            <div className='flex flex-col bg-inherit items-start justify-center'>
                <div className='flex-row flex-wrap items-start  w-full p-4 justify-start md:flex lg:flex xl:flex '>
                   <Tabs defaultActiveKey="1" className='w-full'>
                        <TabPane tab="Overview" key="1">
                            <OverviewsMenus />
                        </TabPane>
                        <TabPane tab="Lectures" key="2">
                            <LectureMenus />
                        </TabPane>
                        <TabPane tab="Tutorials" key="3">
                            <TutorialMenus />
                        </TabPane>
                        <TabPane tab="Assignments" key="4">
                            <AssignmentsMenus />
                        </TabPane>
                        <TabPane tab="Quizzes" key="5">
                            <QuizzesMenus />
                        </TabPane>
                        <TabPane tab="Past Exams" key="6">
                            <ExamsMenus />
                        </TabPane>
                        <TabPane tab="Forum" key="7">
                            <Forum />
                        </TabPane>
                        <TabPane tab="Uploaded Materials" key="8">
                            <UploadedMaterials />
                        </TabPane>
                    </Tabs>
                            
                </div>
            </div>
        </div>
    )
}

export default SubjectDetails


{/* 
<div className='flex flex-row items-start justify-center  dark:bg-inherit w-1/6 p-2 m-1'>
                        <select className='dark:bg-inherit dark:text-white w-full'>
                            <option value="overview">Overview</option>
                            <option value="announcments">Announcments</option>
                        </select>
                    </div>
<div className='flex flex-row items-start justify-center dark:bg-inherit w-1/6 p-2 m-1'>
                        <select className='dark:bg-inherit dark:text-white w-full'>
                            <option value="lecture1">Lecture 1</option>
                            <option value="lecture2">Lecture 2</option>
                        </select>
                    </div>
                    <div className='flex flex-row items-start justify-center dark:bg-inherit w-1/7 p-2 m-1'>
                        <select className='dark:bg-inherit dark:text-white w-full'>
                            <option value="tutorial1">Tutorial 1</option>
                            <option value="tutorial2">Tutorial 2</option>
                        </select>
                    </div>
                    <div className='flex flex-row items-start justify-center dark:bg-inherit w-1/7 p-2 m-1'>
                        <select className='dark:bg-inherit dark:text-white w-full'>
                            <option value="assignment1">Assignment 1</option>
                            <option value="assignment2">Assignment 2</option>
                        </select>
                    </div>
                    <div className='flex flex-row items-start justify-center dark:bg-inherit w-1/7 py-2 m-1'>
                        <Link to={`/subject/${id}/project`}> <button className='dark:bg-inherit dark:text-white w-full p-2 border border-gray-500'>Quizes</button></Link>

                    </div>
                    <div className='flex flex-row items-start justify-center dark:bg-inherit w-1/7 py-2 m-1'>
                        <Link to={`/subject/${id}/project`}> <button className='dark:bg-inherit dark:text-white w-full p-2 border border-gray-500'>Forum</button></Link>
                    </div>
                    <div className='flex flex-row items-start justify-center dark:bg-inherit w-1/7 p-2 m-1'>
                        <select className='dark:bg-inherit dark:text-white w-full'>
                            <option value="exam1">Exam 1</option>
                            <option value="exam2">Exam 2</option>
                        </select>
                    </div>
                    <div className='flex flex-row items-start justify-center dark:bg-inherit w-1/7 py-2 m-1'>
                        <Link to={`/subject/${id}/project`}> <button className='dark:bg-inherit dark:text-white w-full p-2 border border-gray-500'>Uploaded Materials</button></Link>
                    </div> 



<select className='bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-700 p-2 rounded-lg shadow-md'>
                        {subjectmenus.map((subjectmenu) => (
                            <option key={subjectmenu.id} value={subjectmenu.id}>{subjectmenu.name}</option>
                        ))}
                    </select>


        
                
                */}

                {/* <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">

                    <li>
                        <div className="flex items-center">

                            <Link to="/dashboard" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Dashboard</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <Link to="/dashboard" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                {subjectdata.title}
                            </Link>
                        </div>
                    </li>
                </ol>
            </nav> */}