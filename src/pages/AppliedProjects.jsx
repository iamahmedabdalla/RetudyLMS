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

const AppliedProjects = () => {
    const { user } = UserAuth();
    const userUID = user.uid;
    const navigate = useNavigate();

    const [projectID, setProjectID] = useState("");
    const [Projects, setProjects] = useState([]);



      // listing applied projects
      useEffect (() => {
        const getProjects = async () => {
          const querySnapshot = await getDocs(collection(db, "users", userUID, "appliedProjects"));
          querySnapshot.forEach((doc) => {
            // get doc id
            setProjectID(doc.id);
          });
        };
        getProjects();
      }, [user]);

      // get project details


      function getProjectDetails() {
        projectID.map((id) => {
          const docRef = doc(db, "projects", id);
          getDoc(docRef).then((doc) => {
            if (doc.exists()) {
              setProjects((Projects) => [...Projects, doc.data()]);
            } else {
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
        });
      }
  

      // list project with given id
      useEffect (() => {
        const getProject = async () => {
          const docRef = doc(db, "projects", projectID);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProjects((Projects) => [...Projects, docSnap.data()]);
          } else {
            console.log("No such document!");
          }
        };
        getProject();
      }, [projectID]);

      

  
  return (
    <>
     <div className="">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
          <p className="text-3xl font-bold">Applied Projects 🛒</p>
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
                        <i className="fas fa-star">
                          {
                            project.status === "rejected" ? (
                              <span className="bg-red-400 text-white px-2 py-1 rounded-full text-xs">
                                Rejected
                              </span>
                            ) : project.status === "accepted" ? (
                              <span className="bg-green-400 text-white px-2 py-1 rounded-full text-xs">
                                Accepted
                              </span>
                            ) : (
                              <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs">
                                Pending
                              </span>
                            )
                          }
                        </i>
                      </span>
                    </p>
                  </div> <p className="text-gray-600 text-xs md:text-sm vertical-align: baseline;">
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

export default AppliedProjects