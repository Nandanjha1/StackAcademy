import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';
// import Header from './Sections/Header';
import Footer from './Sections/Footer';
import MessageForm from './Sections/MessageForm';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MainContent from './Sections/MainContent';
import Student from './Dashboard/Student';
import Mentor from './Dashboard/Mentor';
import Admin from './Dashboard/Admin';
// import Home from './Sections/Home';
import DarkVeil from './Particles';

const App = () => {
  return (
    <div className="bg-secondary text-foreground">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <div className='w-full relative top-12 h-screen'>
                <DarkVeil />
              </div>
              {/* <Header /> */}
              {/* <Home /> */}
              <MainContent />
              <MessageForm />
            </>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<MainContent />} />
          <Route path="/sendmessage" element={<MessageForm />} />
          <Route path='/student' element={<Student />} />
          <Route path='/mentor' element={<Mentor />} />
          <Route path='/admin' element={<Admin />} />

          <Route path="*" element={
            <div className="text-center p-20 text-xl font-semibold">
              <h1 className="text-4xl text-red-600 mb-4">404</h1>
              <p>Page Not Found</p>
              <p>The page you are looking for does not exist.</p>
              <p className="mt-4"><a href="/" className="text-blue-600 hover:underline">Go to Home</a></p>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;