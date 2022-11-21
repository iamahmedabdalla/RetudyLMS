import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { Alert, Button, DatePicker, Form, Input, message, Select, Tag } from 'antd'
import 'antd/dist/antd.css';


const AddEvents = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [tags, setTags] = useState('')
    const [points, setPoints] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [fee, setFee] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [Avatar, setAvatar] = useState('')
    const [ticketURL, setTicketURL] = useState('')

    const [speakers, setSpeakers] = useState('')
    const [speakersDescription, setSpeakersDescription] = useState('')
    const [organizers, setOrganizers] = useState('')
    const [sponsors, setSponsors] = useState('')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate()
    const { user } = UserAuth()

    const EventCategory = [
        { label: 'SEP', value: 'SEP' },
        { label: 'ELE', value: 'ELE' },
        { label: 'GEP', value: 'GEP' },
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    const handleAddEvent = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const docRef = await addDoc(collection(db, 'events'), {
                title,
                description,
                startDate,
                endDate,
                time,
                location,
                tags,
                points,
                type,
                category,
                fee,
                maxAttendees,
                Avatar,
                ticketURL,
                speakers,
                speakersDescription,
                organizers,
                sponsors,
                createdAt: serverTimestamp(),
                createdBy: user.uid,
                participants: [],
            });
            message.success('Event Added Successfully');
            setLoading(false)
            setSuccess('Event Added Successfully')
            setTimeout(() => {
                navigate('/events')
            }, 2000);
        }
        catch (error) {
            message.error('Error Adding Event');
            setLoading(false)
            setError(error.message)
        }
    }


  return (
    <div className="mt-20 sm:mt-0 max-w-[900px] mx-auto my-16">

      <div className="md:grid  md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
                Event Details
            </h3>
            <p class="mt-1 text-sm text-gray-600">
                This information will be displayed on the event page. Make sure it is accurate.
            </p>
            
          </div>

        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleAddEvent} >
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
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                     Organiser
                    </label>
                    
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => setOrganizers(e.target.value)}
                      id="title"
                      autoComplete="title"
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  

                  {/* Generat project Duration  */}
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      autoComplete="location"
                      placeholder='Location'
                      onChange={(e) => setLocation(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                       Start Time
                    </label>
                    <input
                      type="time"
                      name="starttime"
                      id="starttime"
                      autoComplete="starttime"
                      placeholder='Event Start Time'
                      onChange={(e) => setTime(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                       Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      autoComplete="start_date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  
                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                         End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      autoComplete="end_date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>



                  {/*  About Section with full length text area */}
                  <div className="col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Event Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder='Write description about the event'
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                        Points
                    </label>
                    <div className="mt-1">
                        <input 
                            type="number"
                            name="points"
                            id="points"
                            onChange={(e) => setPoints(e.target.value)}
                            placeholder='12 points'
                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="fee" className="block text-sm font-medium text-gray-700">
                        Fee (MYR)
                    </label>
                    <div className="mt-1">
                        <input 
                            type="number"
                            name="fee"
                            id="fee"
                            onChange={(e) => setFee(e.target.value)}
                            placeholder='0 (Free)'
                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="max-attendees" className="block text-sm font-medium text-gray-700">
                        Max Attendees
                    </label>
                    <div className="mt-1">
                        <input 
                            type="number"
                            name="max-attendees"
                            id="max-attendees"
                            onChange={(e) => setMaxAttendees(e.target.value)}
                            placeholder='50 (People)'
                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                    </div>
                </div>

                    <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Event Type
                    </label>
                    <div className="mt-1">
                        <select 
                            name="type"
                            id="type"
                            onChange={(e) => setType(e.target.value)}
                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        >
                            <option value="academic">Academic</option>
                            <option value="sports">Sports</option>
                            <option value="cultural">Cultural</option>
                            <option value="technical">Technical</option>
                            <option value="community">Community</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="checkbox" className="block text-sm font-medium text-gray-700">
                        Event Category
                    </label>
                    <div className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <Select
                            mode='tags'
                            style={{ width: '100%' }}
                            options={EventCategory}
                            onChange= {setCategory}

                        />
                    </div>
                    </div>

                  <div className="col-span-6">
                    <label htmlFor="sponsors" className="block text-sm font-medium text-gray-700">
                      Sponsors
                    </label>
                    <div className="mt-1 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <textarea
                        id="sponsors"
                        name="sponsors"
                        rows={3}
                        onChange={(e) => setSponsors(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder='Write a list of sponsors (optional)'
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  {/*  Project Phases */}
                  <div className="col-span-6">
                    <label htmlFor="ticketURL" className="block text-sm font-medium text-gray-700">
                      Google Form URL
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="ticketURL"
                        name="ticketURL"
                        rows={3}
                        onChange={(e) => setTicketURL(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder='Write the Google Form URL (optional)'
                        defaultValue={''}
                      />
                    </div>
                  </div>


                  

                  {/* Generate User Skills Section */}
                  <div className="col-span-6">
                    <label htmlFor="speaker" className="block text-sm font-medium text-gray-700">
                        Speakers
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="speaker"
                        name="speaker"
                        rows={3}
                        onChange={(e) => setSpeakers(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Write a list of speakers (optional)"
                        defaultValue={''}
                      />
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="speakerdesc" className="block text-sm font-medium text-gray-700">
                        Speaker Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="speakerdesc"
                        name="speakerdesc"
                        rows={3}
                        onChange={(e) => setSpeakersDescription(e.target.value)}
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Write a list of speakers (optional)"
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
                    Create Event
                   </button>

                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"> 
                    <Link to='/events' className='text-white'>Cancel</Link>
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

export default AddEvents