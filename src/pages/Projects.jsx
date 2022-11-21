import React from 'react'
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
import { Card, Button, Avatar, Alert } from 'antd';
import 'antd/dist/antd.css';
import { EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { UserAuth } from '../context/AuthContext';

const { Meta } = Card;




const Projects = () => {
  const navigate = useNavigate();
  const { currentUser, user } = UserAuth();
  const userUID = user.uid;

  const [projectList, setProjectList] = useState([]);
  const [projectID, setProjectID] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);






  // Listing all projects from the database once the page loads
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const querySnapshot = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setProjectList((projectList) => [...projectList, doc.data()]);
        setProjectID((projectID) => [...projectID, doc.id]);


      });
    });
    return querySnapshot;
  }, [user]);


  const DocumentID = projectID[
    projectList.findIndex((project) => project.uid === userUID)

  ];


  // Duration of the project calculation
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return `${days} days`;
  };




  return (
    <>
      {/* Generate a button to add a new project
    Generate a list of projects */}
      <div className="">
        <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
          <Button type="primary" style={{
            float: 'right',
            color: 'white',
            borderColor: 'green',
            backgroundColor: 'green',
          }} >
            <Link to="/add-new-project">Add New Project</Link>
          </Button>
          <div className="px-4 py-6 sm:px-0">
            <p className="text-3xl font-bold">Featured Projects 🪣 </p>
            {/* Project Cards list will flow row in desktop and column in mobile */}
            {/* Project Card */}
          </div>

          <div className="flex flex-wrap  md:flex-row  gap-x-20 gap-y-5 ">
            {
              projectList.map((project) => {
                return (
                  <div className='card flex flex-col gap-1 p-3  border-2 border-indigo-900 shadow
             bg-neutral-50 sm:h-48 sm:w-1/2  md:w-auto md:h-1/2 lg:w-80 lg:h-64 xl:w-80 xl:h-64 rounded-md ' key={Math.random()} >
                    <div className="flex flex-row justify-between h-12 p-2">
                      <img src='https://i.pravatar.cc/300' alt="Picture" className="bg-gray-200 w-12 h-12 rounded-full" />
                      <div className="flex flex-col flex-grow ml-4">
                        <div className="text-md font-bold">{project.title || 'Project Title Not Found'}</div>
                        <div className="text-sm text-gray-500">
                          {project.OwnerName || 'Creator Not Found'}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow gap-0">
                      <div className="flex flex-row justify-between h-12 pt-4 mr-3 border-cyan-800">
                        <div className='text-md font-bold ml-2 '>
                          {project.desiredRole || 'Role Not Found'}
                        </div>
                        <div className='text-md font-bold mr-2 '>{
                          calculateDuration(project.startDate, project.endDate)
                        }</div>
                      </div>
                      <div className='flex flex-row'>
                        <div className='text-sm text-gray-500 ml-2'>
                          {project.description || 'Description Not Found'}
                        </div>
                      </div>
                    </div>

                    {/* Bottom of the card */}
                    <div className="flex flex-row justify-between  h-12 p-2 mx-2 items-center">
                      <div className="flex flex-row gap-2">
                        <div className="text-sm text-gray-500"> Start Date: {project.startDate || 'Start Date Not Found'}</div>
                        
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button type="primary" ghost>
                          <Link to={`/projects/${project.projectID}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })

            }
          </div>





        </div>
      </div>
    </>
  )
}

export default Projects

