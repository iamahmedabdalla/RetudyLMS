import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { Alert, Button, DatePicker, Form, Input, message, Select, Tag } from 'antd'
import 'antd/dist/antd.css';

const AddProgram = () => {

    const { user } = UserAuth();
    const userUID = user.uid;
    const navigate = useNavigate()

    const id = useParams()

    const [title, setTitle] = useState('')
    const [head, setHead] = useState('')
    const [duration, setDuration] = useState('')
    const [subjects, setSubjects] = useState('')
    const [campus, setCampus] = useState('')
    const [enrolledStudents, setEnrolledStudents] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    console.log(id)

    const handleAddProgram = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // add program to the faculty collection
            const docRef = await addDoc(collection(db, 'faculties', id.id, 'programs'), {
                title,
                head,
                duration,
                subjects,
                campus,
                enrolledStudents,
                createdAt: serverTimestamp(),
                createdBy: userUID,
            })
            // add Subject collection to the program
            const subjectRef = await addDoc(collection(db, 'faculties', id.id, 'programs', docRef.id, 'subjects'), {
                createdAt: serverTimestamp(),
                createdBy: userUID,
            })
            message.success('Program added successfully')
            navigate('/faculties')
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    


  return (
    <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16">

      <div className="md:grid  md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
                Program Details
            </h3>
            <p class="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
            </p>
            
          </div>

        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleAddProgram} >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      autoComplete="title"
                      placeholder='Enter title'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="head-name" className="block text-sm font-medium text-gray-700">
                        Head
                    </label>
                    
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => setHead(e.target.value)}
                      id="title"
                      autoComplete="title"
                      placeholder='Head of the faculty'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  

                  {/* Generat project Duration  */}
                  

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="capmus" className="block text-sm font-medium text-gray-700">
                        Campus
                    </label>
                    <input
                      type="text"
                      name="campus"
                      id="campus"
                      autoComplete="campus"
                      placeholder='List of campuses'
                      onChange={(e) => setCampus(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="campus" className="block text-sm font-medium text-gray-700">
                        Duration
                    </label>
                    <input
                      type="number"
                      name="duration"
                      id="duration"
                      autoComplete="duration"
                      placeholder='X number of Months'
                      onChange={(e) => setDuration(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  


                  {/*  About Section with full length text area */}
                  

                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
                    Create Program
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

export default AddProgram