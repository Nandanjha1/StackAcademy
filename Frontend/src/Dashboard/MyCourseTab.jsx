import React from "react";
import { BookOpen } from "lucide-react";

// Dummy data for demonstration (replace with real data or props as needed)
const enrolledCourses = [
    {
        id: 1,
        title: "React Basics",
        description: "Learn the fundamentals of React, including components, state, and props.",
    },
    {
        id: 2,
        title: "Node.js Fundamentals",
        description: "Understand the basics of Node.js and backend JavaScript development.",
    },
];

// Dummy setActiveTab function for demonstration (replace with real implementation or props)
const setActiveTab = () => {};

const MyCoursesTab = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
            <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No courses enrolled yet</p>
                <button
                    onClick={() => setActiveTab('courses')}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Browse Courses
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                                Continue Learning
                            </button>
                            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
                                View Certificate
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default MyCoursesTab;
