import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';
import TabPane from 'antd/lib/tabs/TabPane';
import { Alert, Button, message, Drawer, Divider, Tabs } from 'antd';




const SubjectDetail = () => {

  const { id } = useParams();

  const { user } = UserAuth();
  const userUID = user.uid;

  const [subjectdata, setSubjectdata] = useState([]);
  const [subjectMenus, setSubjectMenus] = useState([]);
  const [overviews, setOverviews] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getOverviews = async () => {
        try {
           const SubjectOverview = await getDocs(collection(db, "users", userUID, "currentClasses", id, "overviews"));
            const SubjectOverviewData = SubjectOverview.docs.map((doc) => doc.data());
            setOverviews(SubjectOverviewData);
        } catch (error) {
            console.log(error);
        }
    }

    const getLectureNotes = async () => {
        try {
            const SubjectLectureNotes = await getDocs(collection(db, "users", userUID, "currentClasses", id, "lectures"));
              const SubjectLectureNotesData = SubjectLectureNotes.docs.map((doc) => doc.data());
              setLectures(SubjectLectureNotesData);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };
    const getTutorialNotes = async () => {
        try {
            const SubjectTutorialNotes = await getDocs(collection(db, "users", userUID, "currentClasses", id, "tutorials"));
              const SubjectTutorialNotesData = SubjectTutorialNotes.docs.map((doc) => doc.data());
              setTutorials(SubjectTutorialNotesData);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };
    const getAssignmentNotes = async () => {
        try {
            const SubjectAssignmentNotes = await getDocs(collection(db, "users", userUID, "currentClasses", id, "assignments"));
              const SubjectAssignmentNotesData = SubjectAssignmentNotes.docs.map((doc) => doc.data());
              setAssignments(SubjectAssignmentNotesData);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };
    const getExamNotes = async () => {
        try {
            const SubjectExamNotes = await getDocs(collection(db, "users", userUID, "currentClasses", id, "PastExams"));
              const SubjectExamNotesData = SubjectExamNotes.docs.map((doc) => doc.data());
              setExams(SubjectExamNotesData);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };
    const getQuizNotes = async () => {
        try {
            const SubjectQuizNotes = await getDocs(collection(db, "users", userUID, "currentClasses", id, "quizzes"));
              const SubjectQuizNotesData = SubjectQuizNotes.docs.map((doc) => doc.data());
              setQuizzes(SubjectQuizNotesData);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    getOverviews();
    getLectureNotes();
    getTutorialNotes();
    getAssignmentNotes();
    getExamNotes();
    getQuizNotes();

}, [id]);

function lectureClik(key, event) {
  console.log(key);
  if (key == "1") {
      alert("1");
  }
}

console.log(overviews);


function OverviewsMenus () {
  return (
      <>
      <Tabs defaultActiveKey="1" onChange={lectureClik}>
          {overviews.map((overview, index) => (
              <TabPane tab={overview.name} key={index}>
                  <p>{overview.data}</p>
              </TabPane>
          ))}

      </Tabs>
      </>
  )
}

function LectureMenus (){
  return (
      <>
      <Tabs defaultActiveKey="1" onChange={lectureClik}>
          {lectures.map((lecture) => (
              <TabPane tab={lecture.name} key={lecture.id}>
                  <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                  {lecture.data}
                  </p>
              </TabPane>
          ))}
      </Tabs>
      </>
  )
}

function TutorialMenus (){
  return (
      <>
      <Tabs defaultActiveKey="1" onChange={lectureClik}>
          {tutorials.map((tutorial) => (
              <TabPane tab={tutorial.name} key={tutorial.id}>
                  <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                  {tutorial.data}
                  </p>
              </TabPane>
          ))}
      </Tabs>
      </>
  )
}

function AssignmentsMenus (){
  return (
      <>
      <Tabs defaultActiveKey="1" onChange={lectureClik}>
          {assignments.map((assignment) => (
              <TabPane tab={assignment.name} key={assignment.id}>
                  <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                  {assignment.data}
                  </p>
              </TabPane>
          ))}
      </Tabs>

      </>
  )
}

function QuizzesMenus (){
  return (
      <>
      <Tabs defaultActiveKey="1" onChange={lectureClik}>
          {quizzes.map((quiz) => (
              <TabPane tab={quiz.name} key={quiz.id}>
                  <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                  {quiz.data}
                  </p>
              </TabPane>
          ))}
      </Tabs>
      </>
  )
}

function ExamsMenus (){
  return (
      <>
      <Tabs defaultActiveKey="1" onChange={lectureClik}>
          {exams.map((exam) => (
              <TabPane tab={exam.name} key={exam.id}>
                  <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
                  {exam.data}
                  </p>
              </TabPane>
          ))}
      </Tabs>
      </>
  )
}




function Forum (){
  return (
      <>
      <div className="flex flex-col w-full h-screen bg-zinc-300 dark:bg-zinc-400 ">
          Forum here
      </div>
      </>
  )
}

function UploadedMaterials () {
  return (
      <>
      <div className="overflow-x-auto">
                      <table className="min-w-max w-full table-auto">
                          <thead>
                              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                                  <th className="py-3 px-6 text-left">Name</th>
                                  <th className="py-3 px-6 text-left">Type</th>
                                  <th className="py-3 px-6 text-center">Size</th>
                                  <th className="py-3 px-6 text-center">Date</th>
                                  <th className="py-3 px-6 text-center">Re-Upload</th>
                                  <th className="py-3 px-6 text-center">Download</th>
                                  <th className="py-3 px-6 text-center">Delete</th>
                              </tr>
                          </thead>
                          <tbody className="text-gray-600 text-sm font-light dark:text-white">
                              <UserData />
                          </tbody>
                      </table>
                  </div>
      </>
  )
}

function UserData () {
return (
  <>
  <tr className="border-b">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="mr-2">
                              <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/300" alt="avatar" />
                          </div>
                          <span className="font-medium">
                              No Name
                          </span>
                      </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                          <span>
                              Pdf File
                          </span>
                      </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                          <span >
                              1.2 MB
                          </span>
                      </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                      <span >
                          1/1/2021
                      </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                          </div>
                      </div>

                  </td>
                  <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 16v-4a3 3 0 016 0v4m-3-8a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                          </div>
                      </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          </div>
                          
                      </div>
                  </td>
              </tr>

  </>
)
}



  return (
    <div className='dark:bg-gray-800 dark:text-white w-full'>
            

            <div className='flex flex-col bg-inherit items-start justify-center'>
                <div className='flex-row flex-wrap items-start  w-full p-4 justify-start md:flex lg:flex xl:flex '>
                   <Tabs defaultActiveKey="1" className='w-full'>
                        <TabPane tab="Overview" key="1">
                           <OverviewsMenus />
                        </TabPane>
                        <TabPane tab="Lectures" key="2">
                            <LectureMenus />
                        </TabPane>
                        <TabPane tab="Tutorials" key="3">
                            <TutorialMenus />
                        </TabPane>
                        <TabPane tab="Assignments" key="4">
                            <AssignmentsMenus />
                        </TabPane>
                        <TabPane tab="Quizzes" key="5">
                            <QuizzesMenus />
                        </TabPane>
                        <TabPane tab="Past Exams" key="6">
                            <ExamsMenus />
                        </TabPane>
                        <TabPane tab="Forum" key="7">
                            <Forum />
                        </TabPane>
                        <TabPane tab="Uploaded Materials" key="8">
                            <UploadedMaterials />
                        </TabPane>
                    </Tabs>
                            
                </div>
            </div>
        </div>
  )
}

export default SubjectDetail


// function LectureMenus (){
//   return (
//       <>
//       <Tabs defaultActiveKey="1" onChange={lectureClik}>
//           {lectures.map((lecture) => (
//               <TabPane tab={lecture.name} key={lecture.id}>
//                   <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
//                   {lecture.data}
//                   </p>
//               </TabPane>
//           ))}
//       </Tabs>
//       </>
//   )
// }

// function TutorialMenus (){
//   return (
//       <>
//       <Tabs defaultActiveKey="1" onChange={lectureClik}>
//           {tutorials.map((tutorial) => (
//               <TabPane tab={tutorial.name} key={tutorial.id}>
//                   <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
//                   {tutorial.data}
//                   </p>
//               </TabPane>
//           ))}
//       </Tabs>
//       </>
//   )
// }

// function AssignmentsMenus (){
//   return (
//       <>
//       <Tabs defaultActiveKey="1" onChange={lectureClik}>
//           {assignments.map((assignment) => (
//               <TabPane tab={assignment.name} key={assignment.id}>
//                   <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
//                   {assignment.data}
//                   </p>
//               </TabPane>
//           ))}
//       </Tabs>

//       </>
//   )
// }

// function QuizzesMenus (){
//   return (
//       <>
//       <Tabs defaultActiveKey="1" onChange={lectureClik}>
//           {quizzes.map((quiz) => (
//               <TabPane tab={quiz.name} key={quiz.id}>
//                   <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
//                   {quiz.data}
//                   </p>
//               </TabPane>
//           ))}
//       </Tabs>
//       </>
//   )
// }

// function ExamsMenus (){
//   return (
//       <>
//       <Tabs defaultActiveKey="1" onChange={lectureClik}>
//           {exams.map((exam) => (
//               <TabPane tab={exam.name} key={exam.id}>
//                   <p className="flex justify-center text-gray-500 dark:text-white text-8xl sm:text-xl md:text-lg">
//                   {exam.data}
//                   </p>
//               </TabPane>
//           ))}
//       </Tabs>
//       </>
//   )
// }