import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [userAbout, setUserAbout] = useState('');
  const [userPortfolio, setUserPortfolio] = useState('');
  const [userCoverPhoto, setUserCoverPhoto] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (fname === '' || lname === '' || email === '' || password === '' || confirmPassword === '' || userEducation === '' || userExperience === '' || softSkills === '' || userAbout === '' || userPortfolio === '') {
      setError('Please fill all the fields')
      return
    }
    try {
      await createUser(
        fname,
        lname,
        email,
        password,
        userEducation,
        userExperience,
        softSkills,
        userAbout,
        userPortfolio,
        userCoverPhoto
      )
      navigate('/dashboard')
    }
    catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <>
    <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16">
     
        <div className="md:grid  md:gap-6 mt-20">
        <h2 className="text-3xl font-bold text-center text-sky-500 p-4 rounded-md">Sign Up</h2>
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">
                Already have an account? <Link to="/signin" className="text-sky-500">Login</Link>
              </p>
            </div>
            {
              error && <div className="text-red-500 text-sm">{error}</div>
            }
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setFname(e.target.value)}
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setLname(e.target.value)}
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                       Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Your Portfolio
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          http://
                        </span>
                        <input
                          type="text"
                          onChange={(e) => setUserPortfolio(e.target.value)}
                          name="company-website"
                          id="company-website"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>

                    {/* Generate About Section with full length text area */}
                    <div className="col-span-6">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          onChange={(e) => setUserAbout(e.target.value)}
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Hi, I'm a full stack developer with a passion for building beautiful, intuitive, and responsive websites."
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>

                    {/* Generate Cover Photo Section with full length  */}
                    <div className="col-span-6">
                      <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                        Profile Photo
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          onChange={(e) => setUserCoverPhoto(e.target.value)}
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    </div>

                    {/* Generate User Education Section */}
                    <div className="col-span-6">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Education
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="education"
                          name="education"
                          onChange={(e) => setUserEducation(e.target.value)}
                          rows={3}
                          className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="University of California, Berkeley"
                          defaultValue={''}
                        />
                      </div>
                    </div>

                    {/* Generate User Experience Section */}
                    <div className="col-span-6">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="experience"
                          name="experience"
                          onChange={(e) => setUserExperience(e.target.value)}
                          rows={3}
                          className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Software Engineer at Google"
                          defaultValue={''}
                        />
                      </div>
                    </div>

                    {/* Generate User Skills Section */}
                    <div className="col-span-6">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Skills
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="skills"
                          onChange={(e) => setSoftSkills(e.target.value)}
                          name="skills"
                          rows={3}
                          className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="React, Node, Express, MongoDB"
                          defaultValue={''}
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
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
