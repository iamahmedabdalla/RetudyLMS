import React, { useEffect, useState, useRef } from 'react'
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { PlusOutlined } from '@ant-design/icons';
import { Alert, Input, Tag, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { async } from '@firebase/util';



const AddNewProject = () => {

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesiredRole, setProjectDesiredRole] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [projectSkills, setProjectSkills] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectPhases, setProjectPhases] = useState('');
  const [ProjectRequirements, setProjectRequirements] = useState('');
  const [projectSalary, setProjectSalary] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // set ProjectID to document ID
  const [projectID, setProjectID] = useState('');


   
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectTitle === '' || projectStartDate === '' || projectEndDate === '' || projectSkills === '' || projectDescription === '' || projectPhases === '' || ProjectRequirements === '') {
      setError('Please fill all the fields');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // get document ID
      const docRef = await addDoc(collection(db, 'projects' ), {
        createdAt: serverTimestamp(),
      });
      setProjectID(docRef.id);
      await setDoc(doc(db, 'projects', docRef.id), {
        title: projectTitle,
        desiredRole: projectDesiredRole,
        startDate: projectStartDate,
        endDate: projectEndDate,
        skills: projectSkills,
        description: projectDescription,
        phases: projectPhases,
        requirements: ProjectRequirements,
        createdAt: serverTimestamp(),
        OwnerUid: user.uid,
        OwnerName: user.displayName,
        OwnerEmail: user.email,
        OwnerPhoto: user.photoURL,
        projectID: docRef.id,
        salary: projectSalary,
        members: [],
        appliedUsers: [],
        acceptedUsers: [],
        rejectedUsers: [],
        completedUsers: [],
        projectStatus: 'Open',
      });
      await addDoc(collection(db, 'users', user.uid, 'projects'), {
        title: projectTitle,
        desiredRole: projectDesiredRole,
        startDate: projectStartDate,
        endDate: projectEndDate,
        skills: projectSkills,
        description: projectDescription,
        phases: projectPhases,
        requirements: ProjectRequirements,
        createdAt: serverTimestamp(),
        OwnerUid: user.uid,
        OwnerName: user.displayName,
        OwnerEmail: user.email,
        OwnerPhoto: user.photoURL,
        projectID: projectID,
        projectID: docRef.id,
        salary: projectSalary,
        appliedUsers: [],
        acceptedUsers: [],
        rejectedUsers: [],
        completedUsers: [],
        projectStatus: 'Open',
      })
      // Adding collection to the project for the project owner
      setSuccess('Project created successfully');
      setLoading(false);
    }
    catch (error) {
      setError(error.message);
      setLoading(false);
    }




  }

  const { user } = UserAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  return (
    <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16">

      <div className="md:grid  md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Project Information
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              This information will be displayed in the project card.
            </p>
            
          </div>

        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit} >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Project Title
                    </label>
                    
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => setProjectTitle(e.target.value)}
                      id="title"
                      autoComplete="title"
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Desired Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      autoComplete="role"
                      placeholder='Enter the role you are looking for'
                      onChange={(e) => setProjectDesiredRole(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  {/* Generat project Duration  */}
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      name="salary"
                      id="salary"
                      autoComplete="salary"
                      placeholder='XXXX-XXXX'
                      onChange={(e) => setProjectSalary(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Project Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      autoComplete="start_date"
                      onChange={(e) => setProjectStartDate(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Project End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      autoComplete="end_date"
                      onChange={(e) => setProjectEndDate(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>



                  {/*  About Section with full length text area */}
                  <div className="col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Project Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder='Write a short description about your project'
                        defaultValue={''}
                      />
                    </div>
                  </div>



                  {/*  Project Requirements */}
                  <div className="col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Project Requirements
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        onChange={(e) => setProjectRequirements(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder='Write a project requirements for the project'
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  {/*  Project Phases */}
                  <div className="col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Project Phases
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="phases"
                        name="phases"
                        rows={3}
                        onChange={(e) => setProjectPhases(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder='Write a project phases for the project'
                        defaultValue={''}
                      />
                    </div>
                  </div>


                  

                  {/* Generate User Skills Section */}
                  <div className="col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <p className="text-sm text-gray-500">Use commas to separate tags. Like "HTML, CSS, JavaScript"</p>

                    <div className="mt-1">
                      <textarea
                        id="skills"
                        name="skills"
                        rows={3}
                        onChange={(e) => setProjectSkills(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="HTML, CSS, JavaScript"
                        defaultValue={''}
                      />
                    </div>
                  </div>
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
                    Create Project
                   </button>

                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"> 
                    <Link to='/projects' className='text-white'>Cancel</Link>
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

export default AddNewProject




// project title: Project Finder Website 
// Desired Role: React Developer
// project description: I want to create a website where people can post their projects and other people can apply for the project.
// project requirements: React, Node, Express, MongoDB
// project phases: Phase 1: Create a landing page, Phase 2: Create a login page, Phase 3: Create a dashboard page, Phase 4: Create a project page, Phase 5: Create a project details page, Phase 6: Create a project apply page, Phase 7: Create a project apply details page, Phase 8: Create a project apply form page, Phase 9: Create a project apply form details page, Phase 10: Create a project apply form submit page, Phase 11: Create a project apply form submit details page, Phase 12: Create a project apply form submit success page, Phase 13: Create a project apply form submit success details page, Phase 14: Create a project apply form submit success details page, Phase 15: Create a project apply form submit success details page, Phase 16: Create a project apply form submit success details page, Phase 17: Create a project apply form submit success details page, Phase 18: Create a project apply form submit success details page, Phase 19: Create a project apply form submit success details page, Phase 20: Create a project apply form submit success details page, Phase 21: Create a project apply form submit success details page, Phase 22: Create a project apply form submit success details page, Phase 23: Create a project apply form submit success details page, Phase 24: Create a project apply form submit success details page, Phase 25: Create a project apply form submit success details page, Phase 26: Create a project apply form submit success details page, Phase 27: Create a project apply form submit success details page, Phase 28: Create a project apply form submit success details page, Phase 29: Create a project apply form submit success details page, Phase 30: Create a project apply form submit success details page, Phase 31: Create a project apply form submit success details page, Phase 32: Create a project apply form submit success details page, Phase 33: Create a project apply form submit success details page, Phase 34: Create a project apply form submit success details page, Phase 35: Create a project apply form submit success details page, Phase 36: Create a project apply form submit success details page, Phase 37: Create a project apply form submit success details page, Phase 38: Create a project apply form submit success details page, Phase 39: Create a project apply
// project skills: React, Node, Express, MongoDB