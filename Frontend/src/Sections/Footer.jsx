import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="mb-14 px-6 md:px-16 pb-8 border-b border-gray-700 flex flex-col md:flex-row items-center md:justify-between">
                <h1 className="text-2xl font-bold text-lime-400 mb-4 md:mb-0">Follow Us</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition duration-200">
                        <Facebook />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition duration-200">
                        <Instagram />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition duration-200">
                        <Twitter />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition duration-200">
                        <Linkedin />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition duration-200">
                        <Youtube />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition duration-200">
                        <Github />
                    </a>
                </div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold text-lime-400 mb-2">StackAcademy</h2>
                    <p className="text-gray-400">
                        Empowering students with the best tech education. Build skills, projects, and a future in full-stack development.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Quick Links</h3>
                    <ul className="space-y-1 text-gray-400">
                        <li><a href="#" className="hover:text-lime-400">Home</a></li>
                        <li><a href="#" className="hover:text-lime-400">Courses</a></li>
                        <li><a href="#" className="hover:text-lime-400">About Us</a></li>
                        <li><a href="#" className="hover:text-lime-400">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Contact Us</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li className="flex items-center gap-2">
                            <MapPin size={16} /> Chandigarh University, Punjab
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} /> +91 7903310401, +91 9534647743
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} /> maachandi2@gmail.com
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} StackAcademy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
