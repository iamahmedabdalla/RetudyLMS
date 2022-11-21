import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { Alert, Button, DatePicker, Form, Input, message, Select, Tag } from 'antd'
import 'antd/dist/antd.css';

const AddSubject = () => {

    const { user } = UserAuth();
    const userUID = user.uid;
    const navigate = useNavigate()

    const id = useParams()

    const [title, setTitle] = useState('')
    const [avatar, setAvatar] = useState('')
    const [lecturers, setLecturers] = useState([])
    const [location, setLocation] = useState('')
    const [time, setTime] = useState('')
    const [code, setCode] = useState('')

    const [participants, setParticipants] = useState([])

    const [overview, setOverview] = useState([])
    const [lecturenotes, setLecturenotes] = useState([])
    const [tutorials, setTutorials] = useState([])
    const [forum, setForum] = useState([])
    const [assignments, setAssignments] = useState([])
    const [exams, setExams] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleAddSubject = async (e) => {
        e.preventDefault()
        try {
            // adding subject to the program
            const docRef = await addDoc(collection(db, 'faculties', 'JG9Jl14O2aBdc8jTsPzU', 'programs', id.id, 'subjects'), {
                title,
                avatar,
                lecturers,
                location,
                time,
                code,
                createdAt: serverTimestamp(),
                createdBy: userUID,
            })
            const subjectRef = await addDoc(collection(db, 'faculties', 'JG9Jl14O2aBdc8jTsPzU', 'programs', id.id, 'subjects', docRef.id, 'details'), {
                overview,
                lecturenotes,
                tutorials,
                forum,
                assignments,
                exams,
            })
            message.success('Subject added successfully')
            navigate(`/faculties/JG9Jl14O2aBdc8jTsPzU/programs/${id.programId}`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    


  return (
    <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16 dark:text-white">

    <div className="md:grid  md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="dark:text-white text-lg font-medium leading-6 text-gray-900">
              Program Details
          </h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-white">
              This information will be displayed publicly so be careful what you share.
          </p>
          
        </div>

      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleAddSubject} className="dark:bg-inherit dark:border-2 dark:border-blue-800 ">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6 dark:bg-inherit dark:text-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="dark:text-white block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    autoComplete="title"
                    placeholder='Enter title'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="lecturer" className="block text-sm font-medium text-gray-700 dark:text-white">
                      Lecturer
                  </label>
                  
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setLecturers(e.target.value)}
                    id="title"
                    autoComplete="title"
                    placeholder='Enter lecturer'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                

                {/* Generat project Duration  */}
                

                <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-white">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      autoComplete="location"
                      placeholder='Location (e.g. CG203)'
                      onChange={(e) => setLocation(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white' 
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-white">
                       Hours Per Week
                    </label>
                    <input
                      type="number"
                      name="hoursperweek"
                      id="hoursperweek"
                      autoComplete="hoursperweek"
                      placeholder='Subject Hours Per Week'
                      onChange={(e) => setTime(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="Code" className="block text-sm font-medium text-gray-700 dark:text-white">
                       Code
                    </label>
                    <input
                      type="text"
                      name="subjectcode"
                      id="subjectcode"
                      autoComplete="subjectcode"
                      placeholder='Subject Code (e.g. CS 101)'
                      onChange={(e) => setCode(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                    />
                  </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="campus" className="block text-sm font-medium text-gray-700 dark:text-white">
                      Duration
                  </label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    autoComplete="duration"
                    placeholder='X number of Months'
                    onChange={(e) => setParticipants(e.target.value)}
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-inherit dark:text-white'
                  />
                </div>

                


                {/*  About Section with full length text area */}
                

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
                  Create Subject
                 </button>

                <button type='button' onClick={() => navigate('/faculties')} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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

export default AddSubject