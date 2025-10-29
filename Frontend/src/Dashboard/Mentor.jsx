import React, { useContext, useState } from 'react';
import { Users, Calendar, MessageSquare, Clock, Trophy, User } from 'lucide-react';
import { Context } from '../main.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Mentor = () => {
    const { user } = useContext(Context);
    // In a real application, this data would be fetched from a database
    const [mentorData, setMentorData] = useState({
        specialization: "Full-Stack Development",
        bio: "Experienced developer with a passion for mentoring new talent. Specializing in React, Node.js, and database design.",
        mentees: [
            { id: 1, name: "Abhishek Kumar", progress: 85, lastSession: "2 days ago" },
            { id: 2, name: "Dikshit Singh", progress: 60, lastSession: "1 week ago" },
            { id: 3, name: "Varun Sharma", progress: 95, lastSession: "5 days ago" },
        ],
        upcomingSessions: [
            { id: 101, mentee: "Nandan Kumar", time: "Today, 4:00 PM", topic: "React Hooks deep dive" },
            { id: 102, mentee: "Mahesh Kumar", time: "Tomorrow, 10:00 AM", topic: "Node.js API security" },
        ],
        stats: {
            totalMentees: 5,
            sessionsThisWeek: 3,
            averageRating: 4.8,
            quizzesCompleted: 25,
        }
    });
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
    const navigateTo = useNavigate();
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
        <div className="p-8 space-y-8">
            {/* Mentor Profile Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start md:justify-between space-y-4 md:space-y-0">

                {/* Left Section: Profile + Details */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex-shrink-0">
                        {/* Placeholder for mentor's profile picture */}
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                            <Users />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {user.firstName} {user.lastName}!
                        </h1>
                        <p className="text-lg text-blue-600">{mentorData.specialization}</p>
                        <p className="mt-2 text-gray-600 max-w-2xl">{mentorData.bio}</p>
                    </div>
                </div>

                {/* Right Section: Logout Button */}
                <div className="w-full md:w-auto flex justify-center md:justify-end">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>


            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-100 p-6 rounded-xl shadow-md flex items-center space-x-4">
                    <Users className="h-10 w-10 text-blue-600" />
                    <div>
                        <p className="text-gray-600">Total Mentees</p>
                        <p className="text-2xl font-bold text-gray-900">{mentorData.stats.totalMentees}</p>
                    </div>
                </div>
                <div className="bg-green-100 p-6 rounded-xl shadow-md flex items-center space-x-4">
                    <Trophy className="h-10 w-10 text-green-600" />
                    <div>
                        <p className="text-gray-600">Quizzes Completed</p>
                        <p className="text-2xl font-bold text-gray-900">{mentorData.stats.quizzesCompleted}</p>
                    </div>
                </div>
                <div className="bg-yellow-100 p-6 rounded-xl shadow-md flex items-center space-x-4">
                    <Clock className="h-10 w-10 text-yellow-600" />
                    <div>
                        <p className="text-gray-600">Sessions this Week</p>
                        <p className="text-2xl font-bold text-gray-900">{mentorData.stats.sessionsThisWeek}</p>
                    </div>
                </div>
                <div className="bg-red-100 p-6 rounded-xl shadow-md flex items-center space-x-4">
                    <MessageSquare className="h-10 w-10 text-red-600" />
                    <div>
                        <p className="text-gray-600">Average Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{mentorData.stats.averageRating}</p>
                    </div>
                </div>
            </div>

            {/* Upcoming Sessions & Mentee List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Sessions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Sessions</h2>
                    <div className="space-y-4">
                        {mentorData.upcomingSessions.map(session => (
                            <div key={session.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="h-6 w-6 text-blue-500 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-800">{session.topic}</p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">With {session.mentee}</span>
                                        <span className="ml-2 text-xs text-gray-400">({session.time})</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mentee List */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">My Mentees</h2>
                    <div className="space-y-4">
                        {mentorData.mentees.map(mentee => (
                            <div key={mentee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Users className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-800">{mentee.name}</p>
                                        <p className="text-sm text-gray-500">Last Session: {mentee.lastSession}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-800">Progress: {mentee.progress}%</p>
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${mentee.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentor;
