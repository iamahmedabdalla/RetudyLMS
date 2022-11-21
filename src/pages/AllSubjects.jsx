import React from 'react'
import { Button, DatePicker, Tag } from 'antd'
import { collection, doc, addDoc, serverTimestamp, getDoc, setDoc, getDocs, deleteDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

  import { db } from "../firebase";
  import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { Col, Alert, Drawer, Form, Input, Row, Select, Space, Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

const AllSubjects = () => {
  const { user, logout, userRole } = UserAuth();
  const {id} = useParams();

  const [subjectsList, setSubjectsList] = useState([]);
  const [subjectsID, setSubjectsID] = useState("");



  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Listing all subjects from the database once the page loads
  useEffect(() => {
    const getSubjectList = async () => {
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "AllSubjects"));
      querySnapshot.forEach((doc) => {
        setSubjectsList((subjectsList) => [...subjectsList, doc.data()]);
        setSubjectsID((subjectsID) => [...subjectsID, doc.id]);
      });
    };
    getSubjectList();
  }, [user]);

  const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


  function SubjectsComponent() {
    return (
        <>
                <div className="overflow-x-auto ">
                    <div className="flex flex-row dark:bg-slate-900 dark:text-white rounded-lg shadow-lg">
                      {subjectsList ? subjectsList.map((subject, index) => (
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
                                        {subject.name ? subject.name : "No Name"}
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-300 ml-2">
                                        {subject.lecturer ? subject.lecturer : "Not Assigned"}
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
                                        {subject.location ? subject.location : "No Location"}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                        {subject.time ? subject.time + 'h P/W' : "No Time"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between px-4 pt-0  mb-4 rounded-t-lg gap-5">
                                <div className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>

                                    <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                        {subject.students ? subject.students + ' Students' : "27 Students"}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                                    </svg>

                                    <p className="text-sm font-bold text-gray-900 mt-4 ml-1 dark:text-white">
                                        {subject.code ? subject.code : 'No Code'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center items-end px-4 w-72 pt-0 rounded-t-lg gap-5'>
                                <Link to={`/subjects/${subjectsID[index]}`}>
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

    const onFinish = async (values) => {
      try {
          const docRef = await addDoc(collection(db, "users", user.uid, "AllSubjects"), {
              name: values.name,
              code: values.code,
              time: values.time,
              lecturer: user.displayName,
          });
          const subCollectionRef = await addDoc(collection(db, "users", user.uid, "AllSubjects", docRef.id, "overviews"), {
              
          });
          const subCollectionRef2 = await addDoc(collection(db, "users", user.uid, "AllSubjects", docRef.id, "lectures"), {

          });
          const subCollectionRef3 = await addDoc(collection(db, "users", user.uid, "AllSubjects", docRef.id, "tutorials"), {

          });
          const subCollectionRef4 = await addDoc(collection(db, "users", user.uid, "AllSubjects", docRef.id, "assignments"), {

          });
          const subCollectionRef5 = await addDoc(collection(db, "users", user.uid, "AllSubjects", docRef.id, "exams"), {

          });
          const subCollectionRef6 = await addDoc(collection(db, "users", user.uid, "AllSubjects", docRef.id, "quizzes"), {

          });
          console.log("Document written with ID: ", docRef.id);
          setSuccess("Overview added successfully");
          
      } catch (error) {
          console.error("Error adding document: ", error);
          setError(error.message);
      }
  };

  return (
    <div>
      {userRole === "student" ? (
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white"> Student </h1>
      ) : (
        userRole === "teacher" && (
          <div className="flex flex-col ">
          <div className="mb-5 ">
            <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4"> List of all Subjects </h1>
          <Button type="primary" onClick={showDrawer}> Add Subject </Button>
          </div>
          <SubjectsComponent />
          <Drawer 
                    title="Add New Subject"
                    width={350}
                    onClose={onClose}
                    open={open}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                        </Space>
                    }
                    bodyStyle={{
                        paddingBottom: 80,
                    }}

                >
                    <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Subject Name'
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please Subject Name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="location"
                                    label="Location"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter location',
                                        },
                                    ]}
                                >
                                    <Input rows={4} placeholder="location of the Subject (C301)" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="time"
                                    label="Time"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter hours per week',
                                        },
                                    ]}
                                >
                                    <Input rows={4} placeholder="Hours per week" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="code"
                                    label="Code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter subject code',
                                        },
                                    ]}
                                >
                                    <Input rows={4} placeholder="Subject Code" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Add Subject
                            </Button>
                        </Form.Item>

                        {error && (
                            <Alert message={error} type="error" showIcon closable />
                        )}
                        {success && (
                            <Alert message={success} type="success" showIcon closable />
                        )}

                    </Form>
                </Drawer>
          

             
             

          </div>
          
      </div>
        )
      )}

    </div>
  )
}

export default AllSubjects