import React from 'react';
import { BookOpen, Trophy, Code, Clock, CheckCircle, Play } from "lucide-react";

// The Home component now accepts a 'user' prop
const Home = ({ user }) => {
    const { enrolledCourses, completedQuizzes, solvedProblems, studyHours, recentActivities } = user;

    return (
        <div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Enrolled Courses Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Enrolled Courses</p>
                                <p className="text-3xl font-bold">{enrolledCourses.length}</p>
                            </div>
                            <BookOpen className="h-12 w-12 text-blue-200" />
                        </div>
                    </div>
                    {/* Completed Quizzes Card */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Completed Quizzes</p>
                                <p className="text-3xl font-bold">{completedQuizzes?.length || 0}</p>
                            </div>
                            <Trophy className="h-12 w-12 text-green-200" />
                        </div>
                    </div>
                    {/* Solved Problems Card */}
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Solved Problems</p>
                                <p className="text-3xl font-bold">{solvedProblems?.length || 0}</p>
                            </div>
                            <Code className="h-12 w-12 text-purple-200" />
                        </div>
                    </div>
                    {/* Study Hours Card */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Study Hours</p>
                                <p className="text-3xl font-bold">{studyHours}</p>
                            </div>
                            <Clock className="h-12 w-12 text-orange-200" />
                        </div>
                    </div>
                </div>
                {/* Dynamic Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    {activity.type === 'quiz' ? <CheckCircle className="h-6 w-6 text-green-500" /> : <Play className="h-6 w-6 text-blue-500" />}
                                    <div>
                                        <p className="font-medium text-gray-800">{activity.title}</p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Dynamic Progress Overview Section */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Overview</h3>
                        <div className="space-y-4">
                            {enrolledCourses.slice(0, 3).map((course) => (
                                <div key={course.id}>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>{course.title}</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
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
