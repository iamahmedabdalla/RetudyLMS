import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Alert, message } from 'antd';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import {Button} from 'antd';


const UserProfile = () => {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setUserDetails(doc.data());
        }
      });
    };
    getUserDetails();
  }, [id]);




  return (
    <>
      <>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Button type="primary" ghost>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>


        <div className="overflow-hidden bg-white shadow sm:rounded-lg">

          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">User Detail</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500"> This is the user detail.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userDetails.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userDetails.email}

                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About me</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userDetails.userAbout}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Education</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userDetails.userEducation}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">My Experiences</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userDetails.userExperience}
                </dd>
              </div>


              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">My Skills</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userDetails.softSkills}
                </dd>
              </div>
              
            </dl>

              
          </div>
        </div>
      </>

    </>
  )
}

export default UserProfile