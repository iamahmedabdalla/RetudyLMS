import React, {useEffect, useState} from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'
import { collection, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {MenuOutlined, BellOutlined, CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const MyProjects = () => {
  const { user } = UserAuth();
  const userUID = user.uid;
  const navigate = useNavigate();

  const [Projects, setProjects] = useState([]);

  // List user projects
  useEffect (() => {
  const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "users", userUID, "projects"));
    querySnapshot.forEach((doc) => {
      setProjects((Projects) => [...Projects, doc.data()]);
    });
  };
  getProjects();
  }, [userUID]);



  return (
    <>
     <div className="">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
          <p className="text-3xl font-bold">My Projects 🎉</p>
          {Projects.map((project) => (
            <div className="flex flex-wrap" key={project.id}>
            <div className="w-full md:w-1/2 lg:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    <span className="text-gray-600 text-xs md:text-sm px-6">
                      {project.title || 'No title'}
                    </span>
                    <span className="text-gray-600 text-xs md:text-sm px-6">
                      {project.startDate} - {project.endDate}
                    </span>

                    


                  </p>
                  <div className="w-full font-bold text-xl text-gray-900 px-6">
                    {
                      project.desiredRole || 'No role specified'
                    }
                  </div>
                  <p className="text-gray-800 font-serif text-base px-6 mb-5">
                    {
                      project.description || 'Description not Found'
                    }
                  </p>
                </a>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-between">
                    <img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src="https://i.pravatar.cc/300" alt="Avatar of Author" />
                    <p className="text-gray-600 text-xs md:text-sm">
                      <span className="text-gray-900 font-bold">
                        {
                          project.OwnerName || "Anonymous"
                        }

                      </span>
                    </p>
                  </div>
                  <div className="flex items-center space-between">
                    <p className="text-gray-600 text-xs md:text-sm">
                      <span className="text-gray-500">
                        <i className="fas fa-star"></i>
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm vertical-align: baseline;">
                    <Button type="primary" ghost>
                      <Link to={`/projects/${project.projectID}`}>View</Link>
        
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          ))}

          </div>
        </div>
      </div>



    </>
  )
}

export default MyProjects