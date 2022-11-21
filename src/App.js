import React from 'react';
// Pages
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Messenger from './pages/Messenger';
import Events from './pages/Events';
import EventsDetails from './pages/EventsDetails';
import Faculties from './pages/Faculties';

import CurrentClasses from './pages/CurrentClasses';
import SubjectDetail from './pages/SubjectDetail';

import CurrentSubjects from './pages/CurrentSubjects';
import AllSubjects from './pages/AllSubjects';
import TASubjectsDetails from './pages/TASubjectsDetails';

import Users from './pages/Users';
import AddStudent from './pages/AddStudent';
import AddTeacher from './pages/AddTeacher';
import AddAdmin from './pages/AddAdmin';

import CalendarPage from './pages/Calendar';

import AddEvents from './pages/AddEvents';
import AddFaculties from './pages/AddFaculties';

import Programs from './pages/Programs';
import AddProgram from './pages/AddProgram';

import Subjects from './pages/Subjects';
import AddSubject from './pages/AddSubject';
import SubjectDetails from './pages/SubjectDetails';

import TSubjectDetails from './pages/TSubjectDetails';


import UserProfile from './pages/userProfile';
import AddNewProject from './pages/AddNewProject';
import ProjectDetail from './pages/ProjectDetail';
import MyProjects from './pages/MyProjects';
import AppliedProjects from './pages/AppliedProjects';

import Layout from './Layout/Layout';
import StudentLayout from './Layout/StudentLayout';
import TeacherLayout from './Layout/TeacherLayout';
import AdminLayout from './Layout/AdminLayout';

import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import './index.css'


import { Link, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {


  return (
    <div className='dark:bg-gray-900 h-screen'>
      <AuthContextProvider>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/'
            element={
              // switch between layouts based on user role
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>
              
            }
          >
            <Route
            path='/admin'
            element={
              <ProtectedRoute role='admin'>
                <Projects />
              </ProtectedRoute>
            }
          >

          </Route>
            <Route path='/dashboard' element={
              <ProtectedRoute role='admin'>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/:id' element={<UserProfile />} />
            <Route path='/messenger' element={<Messenger />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/:id' element={<EventsDetails />} />
            <Route path='/add-events' element={<AddEvents />} />
            <Route path='/current-classes' element={
              <ProtectedRoute role='student'>
                <CurrentClasses />
              </ProtectedRoute>
            } />
            <Route path='/current-subject' element={
              <ProtectedRoute role='teacher'>
                <CurrentSubjects />
              </ProtectedRoute>
            } />
            <Route path='/current-subject/:id' element={
              <ProtectedRoute role='teacher'>
                <TSubjectDetails />
              </ProtectedRoute>
            } />
            <Route path='/current-classes/:id' element={
              <ProtectedRoute role='student'>
                <SubjectDetail />
              </ProtectedRoute>
            } />
            <Route path='/faculties' element={
              <ProtectedRoute role='admin'>
                <Faculties />
              </ProtectedRoute>
            } />
            <Route path='/add-faculties' element={
              <ProtectedRoute role='admin'>
                <AddFaculties />
              </ProtectedRoute>
            } />
            <Route path='/faculties/:id' element={
              <ProtectedRoute role='admin'>
                <Programs />
              </ProtectedRoute>
            } />
            <Route path='/faculties/:id/add-program' element={
              <ProtectedRoute role='admin'>
                <AddProgram />
              </ProtectedRoute>
            } />
            <Route path='/faculties/:id/programs/:id' element={
              <ProtectedRoute role='admin'>
                <Subjects />
              </ProtectedRoute>
            } />
            <Route path='/faculties/:id/programs/:id/add-subject' element={
              <ProtectedRoute role='admin'>
                <AddSubject />
              </ProtectedRoute>
            } />
            <Route path='/faculties/:id/programs/:id/subjects' element={
              <ProtectedRoute role='admin'>
                <Subjects />
              </ProtectedRoute>

            } />

             <Route path='/faculties/:id/programs/:id/subjects/:id' element={
              <ProtectedRoute role='admin'>
                <SubjectDetails />
              </ProtectedRoute>

            } />

            <Route path='/users' element={
              <ProtectedRoute role='admin'>
                <Users />
              </ProtectedRoute>
            } />
            <Route path='/users/add-student' element={
              <ProtectedRoute role='admin'>
                <AddStudent />
              </ProtectedRoute>
            } />
            <Route path='/users/add-teacher' element={
              <ProtectedRoute role='admin'>
                <AddTeacher />
              </ProtectedRoute>
            } />
            <Route path='/users/add-admin' element={
              <ProtectedRoute role='admin'>
                <AddAdmin />
              </ProtectedRoute>
            } />
            <Route path='/subjects' element={
              <ProtectedRoute role='teacher, student'>
                <AllSubjects />
              </ProtectedRoute>

            } />
            <Route path='/subjects/:id' element={
              <ProtectedRoute role='teacher, student'>
                <TASubjectsDetails />
              </ProtectedRoute>

            } />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
