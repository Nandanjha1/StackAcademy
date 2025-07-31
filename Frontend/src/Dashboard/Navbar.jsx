import React from "react";
import { BookOpen, User } from "lucide-react";

// Dummy user state and handlers for demonstration (replace with real implementation or props)
const currentUser = { name: "Nandan Kumar", role: "student" };
const setCurrentUser = () => {};
const setShowModal = () => {};

const Navbar = () => (
    <nav className="bg-white shadow-lg rounded-xl mb-6">
        <div className="px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-800">StackAcademy</span>
                </div>
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        <>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCurrentUser(null)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowModal('login')}
                                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setShowModal('register')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;
