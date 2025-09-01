import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import '@/index.css';
import Footer from '@/Sections/Footer';
import MessageForm from '@/Sections/MessageForm';
import Login from '@/Pages/Login';
import Register from '@/Pages/Register';
import MainContent from '@/Sections/MainContent';
import Student from '@/Dashboard/Student';
import Mentor from '@/Dashboard/Mentor';
import Admin from '@/Dashboard/Admin';
import CodeEditor from '@/Dashboard/CodeEditor';
import DarkVeil from '@/Particles';
import CourseDetails from '@/Sections/Course/CourseDetails';
import ProtectedRoute from '@/components/ProtectedRoute'; // <-- IMPORT THE NEW COMPONENT

const App = () => {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden
  const pathsToHideNavbarAndFooter = [
    '/login',
    '/register',
    '/student',
    '/mentor',
    '/admin',
    '/codeEditor'
  ];

  const shouldHide = pathsToHideNavbarAndFooter.some(path => location.pathname.startsWith(path));

  return (
    <div className="bg-secondary text-foreground">
      {!shouldHide && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <div className='w-full relative top-12 h-screen'><DarkVeil /></div>
              <MainContent />
              <MessageForm />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/courseDetails/:courseId' element={<CourseDetails />} />
          <Route path="/courses" element={<MainContent />} />
          <Route path="/sendmessage" element={<MessageForm />} />

          {/* --- PROTECTED ROUTES --- */}
          <Route 
            path='/student' 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <Student />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/mentor' 
            element={
              <ProtectedRoute allowedRoles={['Mentor']}>
                <Mentor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/codeEditor' 
            element={
              <ProtectedRoute allowedRoles={['Student', 'Mentor', 'Admin']}>
                <CodeEditor />
              </ProtectedRoute>
            } 
          />

          {/* 404 Not Found Route */}
          <Route path="*" element={
            <div className="text-center p-20 text-xl font-semibold">
              <h1 className="text-4xl text-red-600 mb-4">404</h1>
              <p>Page Not Found</p>
            </div>
          } />
        </Routes>
      </main>

      {!shouldHide && <Footer />}
    </div>
  );
}

export default App;
