import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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


const Profile = () => {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [userAbout, setUserAbout] = useState('');
  const [userPortfolio, setUserPortfolio] = useState('');
  const [userCoverPhoto, setUserCoverPhoto] = useState('');

  const [error, setError] = useState('')

 // Fetch user data from the database
  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setFname(doc.data().fname);
        setLname(doc.data().lname);
        setEmail(doc.data().email);
        setUserEducation(doc.data().userEducation);
        setUserExperience(doc.data().userExperience);
        setSoftSkills(doc.data().softSkills);
        setUserAbout(doc.data().userAbout);
        setUserPortfolio(doc.data().userPortfolio);
        setUserCoverPhoto(doc.data().userCoverPhoto);
      });
    });
    return unsubscribe;
  }, [user.uid]);

  const message = (type, text) => {
    return <Alert message={text} type={type} showIcon />;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        fname,
        lname,
        email,
        userEducation,
        userExperience,
        softSkills,
        userAbout,
        userPortfolio,
        userCoverPhoto,
      };
      await updateDoc(doc(db, "users", user.uid), updatedUser);
      setUser(updatedUser);
      navigate('/profile');
      Alert = message('success', 'Profile updated successfully');
    } catch (error) {
      setError(error.message);
      
    }
  }

  return (
    <>
        <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Change your profile information.
                  
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                           Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={user.displayName}
                          onChange={(e) => setFname(e.target.value)}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="your-portfolio" className="block text-sm font-medium text-gray-700">
                          Your Portfolio
                        </label>
                        <input
                          type="text"
                          name="your-portfolio"
                          id="your-portfolio"
                          value={userPortfolio}
                          onChange={(e) => setUserPortfolio(e.target.value)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="your-portfolio" className="block text-sm font-medium text-gray-700">
                          About You
                        </label>
                        <textarea
                          type="text"
                          name="your-portfolio"
                          id="your-portfolio"
                          value={userAbout}
                          onChange={(e) => setUserAbout(e.target.value)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="your-cover-photo" className="block text-sm font-medium text-gray-700">
                          Your Cover Photo
                        </label>
                        <img src={userCoverPhoto} alt="cover" className="w-20 h-20 rounded-full" />

                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="your-education" className="block text-sm font-medium text-gray-700">
                          Your Education
                        </label>
                        <input
                          type="text"
                          name="your-education"
                          id="your-education"
                          value={userEducation}
                          onChange={(e) => setUserEducation(e.target.value)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="your-experience" className="block text-sm font-medium text-gray-700">
                          Your Experience
                        </label>
                        <input
                          type="text"
                          name="your-experience"
                          id="your-experience"
                          value={userExperience}
                          onChange={(e) => setUserExperience(e.target.value)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="your-soft-skills" className="block text-sm font-medium text-gray-700">
                          Your Soft Skills
                        </label>
                        <input
                          type="text"
                          name="your-soft-skills"
                          id="your-soft-skills"
                          value={softSkills}
                          onChange={(e) => setSoftSkills(e.target.value)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

    </>
  )
}

export default Profile