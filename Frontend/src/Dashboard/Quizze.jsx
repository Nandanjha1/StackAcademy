import React from "react";
import { Trophy, Clock, Users } from "lucide-react";

// Dummy data for demonstration (replace with real data or props as needed)
const quizzes = [
    {
        id: 1,
        title: "React Basics Quiz",
        questions: 10,
        timeLimit: 15,
        attempts: 3,
    },
    {
        id: 2,
        title: "Node.js Fundamentals Quiz",
        questions: 8,
        timeLimit: 10,
        attempts: 2,
    },
];

// Dummy setActiveQuiz function for demonstration (replace with real implementation or props)
const setActiveQuiz = () => {};

const QuizzesTab = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>{quiz.questions} questions</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{quiz.timeLimit} minutes</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{quiz.attempts} attempts remaining</span>
                        </div>
                    </div>
                    <button
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                        onClick={() => setActiveQuiz(quiz)}
                    >
                        Start Quiz
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuizzesTab;
