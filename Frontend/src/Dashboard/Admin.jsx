import React from "react";
import { Plus, User } from "lucide-react"; // Adjust the import path if needed
import Navbar from "./Navbar";

// Dummy data for courses (replace with real data or props as needed)
const courses = [
    { id: 1, title: "React Basics", mentor: "John Doe" },
    { id: 2, title: "Node.js Fundamentals", mentor: "Jane Smith" },
];

const AdminPanel = () => (
    <div className="container mx-auto p-6">
        <Navbar />
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                    <p className="text-3xl font-bold">1,250</p>
                </div>
                <div className="bg-green-500 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
                    <p className="text-3xl font-bold">{courses.length}</p>
                </div>
                <div className="bg-purple-500 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Active Mentors</h3>
                    <p className="text-3xl font-bold">15</p>
                </div>
                <div className="bg-orange-500 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Completed Courses</h3>
                    <p className="text-3xl font-bold">3,480</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Manage Courses */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Manage Courses</h3>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Course
                        </button>
                    </div>
                    <div className="space-y-3">
                        {courses.map((course) => (
                            <div key={course.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-gray-800">{course.title}</h4>
                                    <p className="text-sm text-gray-500">Mentor: {course.mentor}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Mentors */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Manage Mentors</h3>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Mentor
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    JD
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">John Doe</h4>
                                    <p className="text-sm text-gray-500">React Specialist</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Remove</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                    JS
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">Jane Smith</h4>
                                    <p className="text-sm text-gray-500">Node.js Expert</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <User className="h-6 w-6 text-blue-500" />
                            <div>
                                <p className="font-medium text-gray-800">New student registration</p>
                                <p className="text-sm text-gray-500">Alex Johnson</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <User className="h-6 w-6 text-green-500" />
                            <div>
                                <p className="font-medium text-gray-800">New mentor registration</p>
                                <p className="text-sm text-gray-500">John Doe</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <User className="h-6 w-6 text-purple-500" />
                            <div>
                                <p className="font-medium text-gray-800">New admin registration</p>
                                <p className="text-sm text-gray-500">Jane Smith</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">6 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AdminPanel;
