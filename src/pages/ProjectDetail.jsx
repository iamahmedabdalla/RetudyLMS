import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';
import { Alert, Button, message, Drawer, Divider } from 'antd';
import 'antd/dist/antd.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { data } from 'autoprefixer';
import 'antd/dist/antd.css';
import MyProjects from './MyProjects';
import { async } from '@firebase/util';

const ProjectDetail = () => {
  const { id } = useParams();

  const { user } = UserAuth();
  const userUID = user.uid;


  const [project, setProject] = useState(null);
  const [proID, setProID] = useState(false);
  const [isAttendee, setIsAttendee] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
          if (docSnap.data().members.includes(user.email)) {
            setIsAttendee(true);
          } else {
            setIsAttendee(false);
          }
        } else {
          // if doc.data() is undefined 
          message.error("No such document!");
        }

      } catch (error) {
        setError(error);
      }
      setLoading(false);

    };
    getProject();
  }, [id]);


  const navigate = useNavigate();




  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "projects", id));
      message.success("Project deleted");
    } catch (error) {
      message.error("Error deleting project");
    }
  };
  



  // add user to project
  const handleAddUser = async () => {
    const docRef = doc(db, "users", userUID, "appliedProjects", id);
    await setDoc(docRef, {
      id: id,
    });
    try {
      if (project?.rejectedUsers.includes(user.userUID)) {
        message.error("You have been rejected from this project");
        return
      }
      else {
        const docRef = doc(db, "projects", id, "appliedUsers", userUID);
        await setDoc(docRef, {
          email: user.email,
          name: user.displayName,
          requesterID: userUID,
          status: "pending",
        });
        await updateDoc(doc(db, "projects", id), {
          members: arrayUnion(user.email),
        });
        await updateDoc(doc(db, "users", userUID, "appliedProjects", id), {
          id: id,
        });
        message.success("Your request has been sent");
        setIsAttendee(true);
        navigate("/projects");
      }
    } catch (error) {
      message.error("Error applying to project");
    }
  };

  // remove user from project
  const handleRemoveUser = async () => {
    const docRef = doc(db, "users", userUID, "appliedProjects", id);
    await setDoc(docRef, {
      id: id,
    });
    try {
      if (project?.rejectedUsers.includes(user.userUID)) {
        message.error("You have been rejected from this project");
        return
      }
      else {
        const docRef = doc(db, "projects", id, "appliedUsers", userUID);
        await setDoc(docRef, {
          email: user.email,
          name: user.displayName,
          requesterID: userUID,
          status: "pending",
        });
        await updateDoc(doc(db, "projects", id), {
          members: arrayUnion(user.email),
        });
        await updateDoc(doc(db, "users", userUID, "appliedProjects", id), {
          id: id,
        });
        message.success("Your request has been sent");
        setIsAttendee(false);
        navigate("/projects");
      }
    } catch (error) {
      message.error("Error applying to project");
    }
  };


  useEffect(() => {
    const listMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects", id, "appliedUsers"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setListUsers(data);
      } catch (error) {
        message.error("Error getting members");
      }
    };
    listMembers();
  }, [id]);


  const handleRejectUser = async  (requesterID) => {
    const docRef = doc(db, "projects", id, "appliedUsers", requesterID);
    await updateDoc(docRef, {
      status: "rejected",
    });
    await updateDoc(doc(db, "projects", id), {
      rejectedUsers: arrayUnion(requesterID),
      acceptedUsers: project.acceptedUsers.filter((item) => item !== requesterID),
    });
    message.success("User rejected");
  }
      

  // add user from project

  const handleAcceptUser =  async (requesterID) => {
    const docRef = doc(db, "projects", id, "appliedUsers", requesterID);
    try {
      updateDoc(docRef, {
        status: "accepted",
      });
      await updateDoc(doc(db, "projects", id), {
        acceptedUsers: arrayUnion(requesterID),
        rejectedUsers: project.rejectedUsers.filter((item) => item !== requesterID),
      });
      message.success("User accepted");
    }
    catch (error) {
      message.error("Error accepting user");
    }
  }

  



  console.log(isAttendee);



  return (
    <div>
      <>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8
        
        ">
          <Button type="primary" ghost>
            <Link to="/projects">Back to Projects</Link>
          </Button>

          {
            userUID === project?.OwnerUid ? (

              <Button
                type="danger"
                style={{ float: 'right', }}

                onClick={() => handleDelete(project?.project_ID)}
              >Delete Project</Button>

            ) : (
              isAttendee ? (
                <Button type="danger" style={{ float: 'right', }}
                  onClick={handleRemoveUser}>
                  Cancel Application
                </Button>
              ) : (
                <Button type="primary" style={{ float: 'right', }}
                  onClick={handleAddUser}>
                  Apply for Project
                </Button>
              )
            )

          }
        </div>


        <div className="overflow-hidden bg-white shadow sm:rounded-lg">

          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Project Detail</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Project Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.title}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Desired Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.desiredRole}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About the Project</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.description}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.salary ? project?.salary : "Contact for details"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Project Phases</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.phases}
                </dd>
              </div>


              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Project Duration</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  from  {project?.startDate} to {project?.endDate}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Project Requirements</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.requirements}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Project Skills</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {project?.skills || 'Not specified'}
                </dd>
              </div>

              {/* Table for project members */}
              {
                userUID === project?.OwnerUid ? (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Applied Users</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        
                        {
                          
                      project?.members ?   listUsers.map((user) => (
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" key={user?.uid}>
                              <Link className='text-blue-500  hover:text-blue-800' to={`/profile/${user?.requesterID}`}>{user?.name}</Link>
                              <div className="mt-0 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <Button type="danger" style={{ float: 'right', }}
                                  onClick={() => handleRejectUser(user?.requesterID)}
                                  >
                                  Reject
                                </Button>

                              

                                <Button type="primary" style={{ float: 'right',  marginRight: '10px' }}
                                  onClick={() => handleAcceptUser(user?.requesterID)}
                                  >
                                  Accept
                                </Button>
                                
                              </div>
                            </div>
                          ))
                        

                            : <>
                              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    No users applied yet
                                  </span>
                                </div>
                              </li>
                            </>


                        }
                      </ul>
                    </dd>
                  </div>
                ) : (
                  <>

                  </>
                )

              }







            </dl>
          </div>
        </div>
      </>
    </div>
  )
}

export default ProjectDetail