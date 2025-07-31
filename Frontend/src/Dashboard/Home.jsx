import React from 'react'
import { BookOpen, Trophy, Code, Clock, CheckCircle, Play } from "lucide-react";

// Dummy data for demonstration (replace with real data or props as needed)
const enrolledCourses = [
    { id: 1, title: "React Basics" },
    { id: 2, title: "Node.js Fundamentals" },
    { id: 3, title: "Data Structures" },
];

const currentUser = {
    completedQuizzes: [1, 2],
    solvedProblems: [1, 2, 3, 4],
};

const Home = () => {
    return (
        <div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Enrolled Courses</p>
                                <p className="text-3xl font-bold">{enrolledCourses.length}</p>
                            </div>
                            <BookOpen className="h-12 w-12 text-blue-200" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Completed Quizzes</p>
                                <p className="text-3xl font-bold">{currentUser?.completedQuizzes?.length || 0}</p>
                            </div>
                            <Trophy className="h-12 w-12 text-green-200" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Solved Problems</p>
                                <p className="text-3xl font-bold">{currentUser?.solvedProblems?.length || 0}</p>
                            </div>
                            <Code className="h-12 w-12 text-purple-200" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Study Hours</p>
                                <p className="text-3xl font-bold">12</p>
                            </div>
                            <Clock className="h-12 w-12 text-orange-200" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                                <div>
                                    <p className="font-medium text-gray-800">Completed React Components Quiz</p>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                <Play className="h-6 w-6 text-blue-500" />
                                <div>
                                    <p className="font-medium text-gray-800">Started Node.js Backend Development</p>
                                    <p className="text-sm text-gray-500">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Overview</h3>
                        <div className="space-y-4">
                            {enrolledCourses.slice(0, 3).map((course) => (
                                <div key={course.id}>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>{course.title}</span>
                                        <span>75%</span> {/* This should be dynamic based on actual progress */}
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
