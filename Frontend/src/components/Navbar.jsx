import React, { useState, useContext } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from './ui/button'; 
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/student/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        setMenuOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const goToLogin = () => {
    navigateTo("/login");
    setMenuOpen(false);
  };

  const goToRegister = () => {
    navigateTo("/register");
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md z-50 w-full fixed top-0">
      <div className="container mx-auto px-4 py-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-decoration-none">
          <GraduationCap className="text-blue-600 w-8 h-8 md:w-10 md:h-10" />
          <span className="text-xl md:text-2xl font-semibold text-blue-900 whitespace-nowrap">StackAcademy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">About Us</Link>
          <Link to="/courses" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">Courses</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">Contact Us</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <Button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          ) : (
            <Button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={goToLogin}
            >
              LOGIN
            </Button>
          )}
          <Button 
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={goToRegister}
          >
            Sign Up
          </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-blue-500 focus:outline-none">
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-white border-t border-gray-200 shadow-lg">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-500 py-2 px-3 rounded-md transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-500 py-2 px-3 rounded-md transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/courses"
            className="block text-gray-700 hover:text-blue-500 py-2 px-3 rounded-md transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-500 py-2 px-3 rounded-md transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <div className="pt-4 space-y-3">
            {isAuthenticated ? (
              <Button
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            ) : (
              <Button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={goToLogin}
              >
                LOGIN
              </Button>
            )}
            <Button 
              className="w-full bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={goToRegister}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;