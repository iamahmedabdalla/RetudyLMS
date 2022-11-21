import React, { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UserAuth } from '../context/AuthContext';
import { collection, doc, addDoc, serverTimestamp, getDoc, setDoc, getDocs, deleteDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';
import TabPane from 'antd/lib/tabs/TabPane';
import { Button, Col, Alert, Drawer, Form, Input, Row, Select, Space, Tabs } from 'antd';
import 'antd/dist/antd.css';
import { compareAsc, format } from 'date-fns'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';


const TASubjectsDetails = () => {
    const { id } = useParams();
    const { Option } = Select;
    const moment = require('moment');

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
    const [forums, setForums] = useState([]);

    const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const [addOverview, setAddOverview] = useState('');
    const [addLecture, setAddLecture] = useState('');
    const [addTutorial, setAddTutorial] = useState('');
    const [addAssignment, setAddAssignment] = useState('');
    const [addExam, setAddExam] = useState('');
    const [addQuiz, setAddQuiz] = useState('');
    const [addStudent, setAddStudent] = useState('');
    const [addForum, setAddForum] = useState('');


    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const getOverviews = async () => {
            try {
                const SubjectOverview = await getDocs(collection(db, "users", userUID, "AllSubject", id, "overviews"));
                const SubjectOverviewData = SubjectOverview.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOverviews(SubjectOverviewData);
                console.log(SubjectOverviewData);
            } catch (error) {
                console.log(error);
            }
        }
        const getLectureNotes = async () => {
            try {
                const SubjectLectureNotes = await getDocs(collection(db, "users", userUID, "AllSubject", id, "lectures"));
                const SubjectLectureNotesData = SubjectLectureNotes.docs.map((doc) => doc.data());
                setLectures(SubjectLectureNotesData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getTutorialNotes = async () => {
            try {
                const SubjectTutorialNotes = await getDocs(collection(db, "users", userUID, "AllSubject", id, "tutorials"));
                const SubjectTutorialNotesData = SubjectTutorialNotes.docs.map((doc) => doc.data());
                setTutorials(SubjectTutorialNotesData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getAssignmentNotes = async () => {
            try {
                const SubjectAssignmentNotes = await getDocs(collection(db, "users", userUID, "AllSubject", id, "assignments"));
                const SubjectAssignmentNotesData = SubjectAssignmentNotes.docs.map((doc) => doc.data());
                setAssignments(SubjectAssignmentNotesData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getExamNotes = async () => {
            try {
                const SubjectExamNotes = await getDocs(collection(db, "users", userUID, "AllSubjects", id, "PastExams"));
                const SubjectExamNotesData = SubjectExamNotes.docs.map((doc) => doc.data());
                setExams(SubjectExamNotesData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getQuizNotes = async () => {
            try {
                const SubjectQuizNotes = await getDocs(collection(db, "users", userUID, "AllSubject", id, "quizzes"));
                const SubjectQuizNotesData = SubjectQuizNotes.docs.map((doc) => doc.data());
                setQuizzes(SubjectQuizNotesData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        const getForumData = async () => {
            try {
                const SubjectForumData = await getDocs(collection(db, "users", userUID, "AllSubject", id, "Forums"));
                const SubjectForumDataData = SubjectForumData.docs.map((doc) => doc.data());
                setForums(SubjectForumDataData);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        getOverviews();
        getLectureNotes();
        getTutorialNotes();
        getAssignmentNotes();
        getExamNotes();
        getQuizNotes();
        getForumData();
    }, [id]);

    function lectureClik(key, event) {
        console.log(key);
        if (key == "2") {
            // scroll to bottom
            window.scrollTo(0, document.body.scrollHeight);


        }
    }

    const onFinish = async (values) => {
        try {
            const docRef = await addDoc(collection(db, "users", userUID, "currentClasses", id, "overviews"), {
                name: values.name,
                data: values.url,
            });
            console.log("Document written with ID: ", docRef.id);
            setSuccess("Overview added successfully");
            setAddOverview('');
        } catch (error) {
            console.error("Error adding document: ", error);
            setError(error.message);
        }
    };

    const onFinishForum = async (values) => {
        try {
            const docRef = await addDoc(collection(db, "users", userUID, "currentClasses", id, "Forums"), {
                title: values.title,
                data: values.data,
                name: user.displayName,
                createdAt: Timestamp.now(),
            });
            console.log("Document written with ID: ", docRef.id);
            setSuccess("Forum added successfully");
        } catch (error) {
            console.error("Error adding document: ", error);
            setError(error.message);
        }
    };

    const onFinishExams = async (values) => {
        try {
            const docRef = await addDoc(collection(db, "users", userUID, "currentClasses", id, "PastExams"), {
                name: values.name,
                data: values.url,
            });
            console.log("Document written with ID: ", docRef.id);
            setSuccess("Exam added successfully");
            setAddExam('');
        } catch (error) {
            console.error("Error adding document: ", error);
            setError(error.message);
        }
    };







    console.log(userUID);
    console.log(id);

    function AddNewSection({ BtnName }) {
        return (
            <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>{BtnName}</span>
            </button>
        )

    }





    function OverviewsMenus() {
        return (
            <>

                <button onClick={showDrawer}
                    className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Overview</span>
                </button>
                <Drawer 
                    title="Add Overview"
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
                                            message: 'Please enter Title '
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter Title" />
                                </Form.Item>
                            </Col>


                        </Row>


                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="url"
                                    label="URL Link"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Add New Overview Tab
                            </Button>
                        </Form.Item>



                    </Form>
                </Drawer>

                <Tabs defaultActiveKey="1" onChange={lectureClik}>
                    {overviews.map((overview) => (
                        <TabPane tab={overview.name} key={overview.id}>
                            <div className='flex flex-col items-start justify-start  overflow-hidden shadow sm:rounded-lg p-5
                            xl:flex-row xl:items-start xl:justify-between
                            lg:flex-row lg:items-start lg:justify-between
                            md:flex-row md:items-start md:justify-between
                            '>
                                <div className='flex flex-col items-center justify-start gap-4'>
                                    <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Download </span>
                                    </button>

                                    <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Update </span>
                                    </button>
                                </div>

                                <div className='w-full justify-center items-start'>
                                    <iframe src={overview.data} width="100%" height="700px" />
                                </div>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </>
        )
    }

    function LectureMenus() {
        return (
            <>

                <AddNewSection BtnName="Add New Lecture" />
                <Tabs defaultActiveKey="1" onChange={lectureClik}>
                    {lectures.map((lecture, index) => (
                        <TabPane tab={lecture.name} key={index}>
                            <iframe src={lecture.data} width="100%" height="700px" />
                            <div className='flex flex-row mt-3 items-start justify-start gap-4'>
                            <Button type="primary" ghost icon={<DownloadOutlined />} block >
                                    Download
                                </Button>
                                <Button type="danger" ghost icon={<UploadOutlined /> } block >
                                    Update
                                </Button>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </>
        )
    }

    function TutorialMenus() {
        return (
            <>
                <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add New Tutorial </span>
                </button>


                <Tabs defaultActiveKey="1" onChange={lectureClik}>
                    {tutorials.map((tutorial) => (
                        <TabPane tab={tutorial.name} key={tutorial.id}>
                            <div className='flex flex-col items-start justify-start  overflow-hidden shadow sm:rounded-lg p-5
                            xl:flex-row xl:items-start xl:justify-between
                            lg:flex-row lg:items-start lg:justify-between
                            md:flex-row md:items-start md:justify-between
                            '>
                                <div className='flex flex-col items-center justify-start gap-4'>
                                    <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Download </span>
                                    </button>

                                    <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Update </span>
                                    </button>
                                </div>

                                <div className='w-full justify-center items-start first-letter:'>
                                    <iframe src={tutorial.data} width="100%" height="700px" />
                                </div>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </>
        )
    }

    function AssignmentsMenus() {
        return (
            <>
                <AddNewSection BtnName="Add New Assignment" />

                <Tabs defaultActiveKey="1" onChange={lectureClik}>
                    {assignments.map((assignment) => (
                        <TabPane tab={assignment.name} key={assignment.id}>
                            <div className='flex flex-col items-start justify-start  overflow-hidden shadow sm:rounded-lg p-5
                            xl:flex-row xl:items-start xl:justify-between
                            lg:flex-row lg:items-start lg:justify-between
                            md:flex-row md:items-start md:justify-between
                            '>
                                <div className='flex flex-col items-center justify-start gap-4'>
                                    <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Download </span>
                                    </button>

                                    <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Update </span>
                                    </button>
                                </div>

                                <div className='w-full justify-center items-start'>
                                    <iframe src={assignment.data} width="100%" height="700px" />
                                </div>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </>
        )
    }

    function QuizzesMenus() {
        return (
            <>
                <AddNewSection BtnName="Add New Quiz" />
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



    function ExamsMenus() {
        return (
            <>
                <Button type='primary' onClick={showDrawer} className="w-48">Add New Exam</Button>

                <Drawer
                    title="Add New Exam"
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
                    <Form layout="vertical" hideRequiredMark onFinish={onFinishExams}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter exam name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please enter exam time (2020-09) " />
                                </Form.Item>
                            </Col>


                        </Row>


                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="url"
                                    label="URL Link"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item>
                            <Button type="primary" block htmlType="submit">
                                Add New Exam
                            </Button>
                        </Form.Item>



                    </Form>
                </Drawer>
                <Tabs defaultActiveKey="1" onChange={lectureClik}>
                    {exams.map((exam, index) => (
                        <TabPane tab={exam.name} key={index}>
                            <div className='flex flex-col items-start justify-start  overflow-hidden shadow sm:rounded-lg p-5
                            xl:flex-row xl:items-start xl:justify-between
                            lg:flex-row lg:items-start lg:justify-between
                            md:flex-row md:items-start md:justify-between
                            '>
                                <div className='flex flex-col items-center justify-start gap-4'>
                                <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
                                    Download
                                </Button>
                                <Button type="primary" ghost icon={<UploadOutlined /> } block >
                                    Update
                                </Button>
                                </div>

                                <div className='w-full justify-center items-start'>
                                    <iframe src={exam.data} width="100%" height="700px" />
                                </div>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </>
        )
    }




    function Forum() {
        return (
            <>
                <div className="flex flex-col w-full h-full ">
                    <div className="flex flex-col">
                        <div className="flex flex-col items-start justify-between w-full gap-5 ">
                            <Button type='primary' onClick={showDrawer} className="w-48">Add New Post</Button>

                            <Drawer
                                title="Add New Post"
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
                                <Form layout="vertical" hideRequiredMark onFinish={onFinishForum}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="title"
                                                label="Title"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter Title '
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Please enter Title" />
                                            </Form.Item>
                                        </Col>


                                    </Row>


                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="data"
                                                label="Description"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'please enter Description'
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea rows={15} placeholder="please enter Description" />
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Form.Item>
                                        <Button type="primary" block htmlType="submit">
                                            Create Post
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Drawer>
                            <ForumData />

                        </div>
                    </div>
                </div>
            </>
        )
    }

    function ConvertDate(date) {
        return moment(date).startOf('hour').fromNow();
    }


    function ForumData() {
        return (
            <>
                {forums.map((forum, index) => (
                    <div className='flex flex-col p-4 items-start justify-between w-full rounded-xl dark:bg-gray-700 bg-white shadow-lg' key={index}>
                        <h1 className="text-2xl font-bold text-white">
                            {forum.title}
                        </h1>
                        <div className='flex flex-row items-center justify-start w-full h-full '>
                            <img src='https://i.pravatar.cc/700' className='w-16 h-16 rounded-lg' />
                            <div className='flex flex-col ml-5 justify-center mt-4 items-start'>
                                <h2 className="text-lg font-bold text-white">{forum.name}</h2>
                                <p className="text-md  text-white">

                                    <ConvertDate date={forum?.createdAt && forum?.createdAt.toDate()} />

                                </p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-start w-full h-full '>
                            <p className='text-md text-white'>
                                {forum.data}
                            </p>
                        </div>
                        <div className='flex flex-row items-center justify-start w-full h-full  gap-4'>
                            <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                                <span>Like </span>
                            </button>
                            <button className="flex flex-row w-48 items-center justify-center h-12 px-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Add Response </span>
                            </button>
                        </div>
                    </div>
                ))}

            </>
        )
    }

    function StudentList() {
        return (
            <>
                <div className="overflow-x-auto">
                    <Button type="primary" onClick={showDrawer} className="mb-4">
                        Add Student
                    </Button>
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-center">Faculty</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Submission Rate</th>
                                <th className="py-3 px-6 text-center">Remove</th>
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

    function UserData() {
        return (
            <>
                <tr className="border-b">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="mr-2">
                                <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                            </div>
                            <span className="font-medium">
                                Ahmed Abdalla
                            </span>
                        </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                            <span>
                                123456789
                            </span>
                        </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                            <span className='bg-fuchsia-200 text-fuchsia-600 py-1 px-3 rounded-full text-xs'>
                                test@gmail.com
                            </span>
                        </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                        <span className="bg-sky-200 text-sky-600 py-1 px-3 rounded-full text-xs">
                            Faculty of Computer Science
                        </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                            <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                Inactive
                            </span>
                        </div>

                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                100%
                            </span>
                        </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => { window.confirm("Are you sure you want to remove this student?, this action cannot be undone and student's data will be deleted") }}>
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
                <TabPane tab="Student List" key="8">
                    <StudentList />
                </TabPane>
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

            </Tabs>

        </div>
    </div>
</div>
  )
}

export default TASubjectsDetails