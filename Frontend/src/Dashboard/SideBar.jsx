import React, { useState } from "react";
import { BookOpen, User, Code, Trophy } from "lucide-react";
import MyCoursesTab from "./MyCourseTab";
import CodingTab from "./CodingTab";
import QuizzesTab from "./Quizze";
import MainContent from "@/Sections/MainContent";
import CodeEditor from "./CodeEditor";
import StudentDashboard from "./StudentDashboard";

const Sidebar = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState("dashboard");

    // Render content based on activeTab
    const renderActiveTab = () => {
        switch (activeTab) {
            case "dashboard":
                return <StudentDashboard />;
            case "courses":
                return <MainContent />;
            case "mycourses":
                return <MyCoursesTab />;
            case "coding":
                return <CodingTab />;
            case "quizzes":
                return <QuizzesTab />;
            case "codeEditor":
                return <CodeEditor />;
            default:
                return (
                    <div className="text-center p-20 text-xl font-semibold">
                        <h1 className="text-4xl text-red-600 mb-4">404</h1>
                        <p>Page Not Found</p>
                        <p>The page you are looking for does not exist.</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex">
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <BookOpen className="h-5 w-5" />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <BookOpen className="h-5 w-5" />
                        <span>All Courses</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('mycourses')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${activeTab === 'mycourses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <User className="h-5 w-5" />
                        <span>My Courses</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('coding')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${activeTab === 'coding' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Code className="h-5 w-5" />
                        <span>Coding Practice</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('quizzes')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${activeTab === 'quizzes' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Trophy className="h-5 w-5" />
                        <span>Quizzes</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('codeEditor')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${activeTab === 'codeEditor' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Code className="h-5 w-5" />
                        <span>Coding Compiler</span>
                    </button>
                </nav>
            </div>
            <div className="flex-1 px-6">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default Sidebar;
