import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';
import Header from './Sections/Header';
import Footer from './Sections/Footer';
import Main from './Sections/main';
import MessageForm from './Sections/MessageForm';
import Login from './Pages/Login';
import Register from './Pages/Register';

const App = () => {
  return (
    <div className="bg-secondary text-foreground">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Main />
              <MessageForm />
            </>
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

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