import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { Alert, Button, DatePicker, Form, Input, message, Select, Tag } from 'antd'
import 'antd/dist/antd.css';
import {createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const AddStudent = () => {

    const navigate = useNavigate()
    const { user } = UserAuth()

    const [student, setStudent] = useState('')

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sID, setSID] = useState('')
    const [avatar, setAvatar] = useState('')
    const [major, setMajor] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

   
        

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')
      setSuccess('')
      try {
        const addnewStudent = await addDoc(collection(db, 'students'), {
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          sID: sID,
          avatar: avatar,
          major: major,
          startDate: startDate,
          endDate: endDate,
          createdAt: serverTimestamp(),
          createdBy: user.email,
          updatedAt: serverTimestamp(),
        })

        setSuccess('Student added successfully')
        navigate('/students')
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }

    
    


  return (
    <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16 dark:text-white">

    <div className="md:grid  md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="dark:text-white text-lg font-medium leading-6 text-gray-900">
            Add Student
          </h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-white">
            Student details
          </p>
          
        </div>

      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit} className="dark:bg-inherit dark:border-2 dark:border-blue-800 ">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6 dark:bg-inherit dark:text-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="dark:text-white block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setFname(e.target.value)}
                    id="title"
                    autoComplete="title"
                    placeholder='Enter first name'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="lname" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Last name
                  </label>
                  
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setLname(e.target.value)}
                    id="title"
                    autoComplete="title"
                    placeholder='Enter last name'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Email
                  </label>
                  
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    autoComplete="email"
                    placeholder='Enter email'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Password
                  </label>
                  
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    autoComplete="password"
                    placeholder='Enter password'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Major 
                  </label>
                  
                  <input
                    type="text"
                    name="id"
                    onChange={(e) => setMajor(e.target.value)}
                    id="text"
                    autoComplete="text"
                    placeholder='Enter student major (e.g. Ms. in Computer Science)'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="sID" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Student ID
                  </label>
                    <input
                      type="text"
                      name="sID"
                      id="sID"
                      autoComplete="sID"
                      placeholder='Enter student ID'
                      onChange={(e) => setSID(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white' 
                    />
                  </div>


                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="Start-Date" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Start Date
                    </label>
                    <input
                      type="date"
                      name="Start-Date"
                      id="Start-Date"
                      autoComplete="Start-Date"
                      placeholder='Enter Enrollment  Date'
                      onChange={(e) => setStartDate(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-white">
                       End Date
                    </label>
                    <input
                      type="date"
                      name="end-date"
                      id="end-date"
                      autoComplete="end-date"
                      placeholder='Enter Graduation Date'
                      onChange={(e) => setEndDate(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                    />
                </div>

              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 dark:bg-inherit dark:text-white">
              <div className="flex">
                <div className="flex flex-start">
                        {
                          error &&  <Alert message={error} type="error" showIcon closable />
                        }
                        {
                          success && <Alert message={success} type="success" showIcon closable />
                        }
                </div>
              <div className="flex gap-2">
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"> 
                  Create Student
                 </button>

                <button type='button' onClick={() => navigate('/users')} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Cancel
                
                 </button>
                
              </div>
              </div>

            
              
            </div>
          </div>
        </form>
      </div>
    </div>
    
  </div>
  )
}

export default AddStudent