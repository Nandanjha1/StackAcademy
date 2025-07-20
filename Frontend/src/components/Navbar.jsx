import React, { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md z-50 w-full fixed top-0">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-blue-600" />
          <span className="text-2xl font-semibold text-blue-900">StackAcademy</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-xl">
          <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">About Us</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Courses</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Contact Us</a>
        </nav>

        {/* Buttons - Desktop */}
        <div className="hidden md:flex space-x-2">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Login</Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">Sign Up</Button>
        </div>

        {/* Hamburger - Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white border-t">
          <a href="#" className="block text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">About Us</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Courses</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Contact Us</a>
          <div className="pt-2 space-y-2">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Login</Button>
            <Button className="w-full bg-green-600 text-white hover:bg-green-700">Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
