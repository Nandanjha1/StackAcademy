import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';
import { Context } from '../main.jsx'; // Use relative path for robustness
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
    // 1. Access the global state from our Context
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
    const navigateTo = useNavigate();

    // 2. Create the handleLogout function
    const handleLogout = async () => {
        try {
            await axios.get("/api/v1/auth/logout", { withCredentials: true });
            toast.success("Logged out successfully!");
            setIsAuthenticated(false);
            setUser({}); // Clear the user object
            navigateTo("/"); // Redirect to home page
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed.");
            setIsAuthenticated(false); // Still log out on frontend even if API fails
            setUser({});
            navigateTo("/");
        }
    };

    return (
        <nav className="bg-white shadow-lg rounded-xl mb-6">
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-800">StackAcademy</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {/* 3. Use the real 'isAuthenticated' state for conditional rendering */}
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        {/* 4. Display the user's actual data (user.firstName) */}
                                        <p className="text-sm font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-3">
                                {/* 5. Update buttons to use <Link> for navigation */}
                                <Link
                                    to="/login"
                                    className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
