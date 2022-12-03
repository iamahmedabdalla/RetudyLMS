import { Tabs } from 'antd'
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
import TabPane from 'antd/lib/tabs/TabPane';

const Users = () => {
    const navigate = useNavigate()
    const { currentUser, user } = UserAuth()
    const userUID = user.uid
    const id = useParams()

    const [users, setUsers] = useState([])
    const [userID, setUserID] = useState("")

    const [students, setStudents] = useState([])
    const [studentsID, setStudentsID] = useState("")

    const [admins, setAdmins] = useState([])
    const [adminsID, setAdminsID] = useState("")

    const [teachers, setTeachers] = useState([])
    const [teachersID, setTeachersID] = useState("")

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // Listing all users from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "users"))
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUsers((users) => [...users, doc.data()])
                setUserID((userID) => [...userID, doc.id])
            })
        })
        return querySnapshot
    }, [user])

    // Listing all students from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "students"))
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setStudents((students) => [...students, doc.data()])
                setStudentsID((studentsID) => [...studentsID, doc.id])
            })
        })
        return querySnapshot
    }, [user])


    // Listing all admins from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "admins"))
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setAdmins((admins) => [...admins, doc.data()])
                setAdminsID((adminsID) => [...adminsID, doc.id])
            })
        })
        return querySnapshot
    }, [user])

    // Listing all teachers from the database once the page loads
    useEffect(() => {
        const q = query(collection(db, "teachers"))
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setTeachers((teachers) => [...teachers, doc.data()])
                setTeachersID((teachersID) => [...teachersID, doc.id])
            })
        })
        return querySnapshot
    }, [user])


    console.log(users)




    function UserTable() {
        return (
            <>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="All Users" key="1">
                        <div className="flex flex-row p-3 justify-between">
                            <h1 className="text-2xl font-semibold dark:text-white">All Users</h1>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-center">Faculty</th>
                                        <th className="py-3 px-6 text-center">Program</th>
                                        <th className="py-3 px-6 text-center">Time Joined</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light dark:text-white">
                                    <UsersData />
                                </tbody>
                            </table>
                        </div>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Students" key="2">
                        <div className="flex flex-row p-3 justify-between">
                            <h1 className="text-2xl font-semibold dark:text-white">All Students</h1>
                            <button
                                onClick={() => navigate('/users/add-student')}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                            > Add Student</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-center">Faculty</th>
                                        <th className="py-3 px-6 text-center">Program</th>
                                        <th className="py-3 px-6 text-center">Time Joined</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light dark:text-white">
                                    <StudentsData />
                                </tbody>
                            </table>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Lecturers" key="3">
                        <div className="flex flex-row p-3 justify-between">
                            <h1 className="text-2xl font-semibold dark:text-white">All Teachers</h1>
                            <button 
                            onClick={() => navigate('/users/add-teacher')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"> Add Teacher</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-center">Faculty</th>
                                        <th className="py-3 px-6 text-center">Program</th>
                                        <th className="py-3 px-6 text-center">kjl Joined</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light dark:text-white">
                                    <TeachersData />
                                </tbody>
                            </table>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Admins" key="4">
                        <div className="flex flex-row p-3 justify-between">
                            <h1 className="text-2xl font-semibold dark:text-white">All Admin</h1>
                            <button 
                            onClick={() => navigate('/users/add-admin')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"> Add Admin</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-center">Role</th>
                                        <th className="py-3 px-6 text-center">Program</th>
                                        <th className="py-3 px-6 text-center">Time Joined</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light dark:text-white">
                                    <AdminsData />
                                </tbody>
                            </table>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </>
        )
    }

    function UsersData() {
        return (
            <>
                {users.map((user, index) => (
                    <tr className="border-b" key={index}>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                                </div>
                                <span className="font-medium">
                                    {user.name}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                                <span>
                                    {user.ID}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                                <span className="bg-sky-200 text-sky-600 py-1 px-3 rounded-full text-xs">
                                    {user.faculty ? user.faculty : "N/A"}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                {user.program ? user.program : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                {user.yearJoined ? user.yearJoined : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                {user.status ? user.status : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 3v4h4" />
                                        <path d="M19 20v-8a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1 -1" />
                                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                                    </svg>
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7v-1a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v1" />
                                        <path d="M9 7v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-5" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}

            </>
        )
    }

    function StudentsData() {
        return (
            <>
                {students.map((student, index) => (
                    <tr className="border-b" key={index}>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                                </div>
                                <span className="font-medium">
                                    {student.fname} {student.lname}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                                <span>
                                    {student.sID ? student.sID : "N/A"}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                                <span className="bg-sky-200 text-sky-600 py-1 px-3 rounded-full text-xs">
                                    {student.faculty ? student.faculty : "N/A"}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                {student.major ? student.major : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                {student.startDate ? student.startDate : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                {student.status ? student.status : "N/A"}
                            </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 3v4h4" />
                                        <path d="M19 20v-8a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1 -1" />
                                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                                    </svg>
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7v-1a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v1" />
                                        <path d="M9 7v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-5" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}

            </>
        )

    }

    function AdminsData() {
        return (
            <>
                {admins ? admins.map((admin, index) => (
                        <tr className="border-b" key={index}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                                    </div>
                                    <span className="font-medium">
                                        {admin.fname} {admin.lname}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                    <span>
                                        {admin.aID ? admin.aID : "N/A"}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center">
                                    <span className="bg-sky-200 text-sky-600 py-1 px-3 rounded-full text-xs">
                                        {admin.role ? admin.role : "N/A"}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                    {admin.faculty ? admin.faculty : "N/A"}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                    {admin.startDate ? admin.startDate : "N/A"}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                    {admin.status ? admin.status : "N/A"}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 3v4h4" />
                                            <path d="M19 20v-8a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1 -1" />
                                            <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                                        </svg>
                                    </div>
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <line x1="4" y1="7" x2="20" y2="7" />
                                            <line x1="10" y1="11" x2="10" y2="17" />
                                            <line x1="14" y1="11" x2="14" y2="17" />
                                            <path d="M5 7v-1a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v1" />
                                            <path d="M9 7v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-5" />
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )) : <h1 className="text-center">No Data</h1>}


            </>
        )
    }

    function TeachersData() {
        return (
            <>
                {teachers ? teachers.map((teacher, index) => (
                        <tr className="border-b" key={index}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                        <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                                    </div>
                                    <span className="font-medium">
                                       {teacher.title} {teacher.fname} {teacher.lname}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                    <span>
                                        {teacher.tID ? teacher.tID : "N/A"}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center">
                                    <span className="bg-sky-200 text-sky-600 py-1 px-3 rounded-full text-xs">
                                        {teacher.faculty ? teacher.faculty : "N/A"}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                    {teacher.email ? teacher.email : "N/A"}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                    {teacher.startDate ? teacher.startDate : "N/A"}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                    {teacher.status ? teacher.status : "N/A"}
                                </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 3v4h4" />
                                            <path d="M19 20v-8a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1 -1" />
                                            <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                                        </svg>
                                    </div>
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <line x1="4" y1="7" x2="20" y2="7" />
                                            <line x1="10" y1="11" x2="10" y2="17" />
                                            <line x1="14" y1="11" x2="14" y2="17" />
                                            <path d="M5 7v-1a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v1" />
                                            <path d="M9 7v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-5" />
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )) : <h1 className="text-center">No Data</h1>}


            </>
        )
    }
    return (
        <>
           <div className="flex flex-col w-full h-full dark:bg-gray-900 p-4">
           <UserTable />
              </div>    
        </>

    )
}


export default Users