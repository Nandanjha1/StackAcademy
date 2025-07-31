import React from "react";
import { CheckCircle } from "lucide-react";

// Dummy data for coding problems (replace with real data or props as needed)
const codingProblems = [
    {
        id: 1,
        title: "Two Sum",
        description: "Find two numbers that add up to a target value.",
        difficulty: "Easy",
        solved: true,
    },
    {
        id: 2,
        title: "Reverse Linked List",
        description: "Reverse a singly linked list.",
        difficulty: "Medium",
        solved: false,
    },
    {
        id: 3,
        title: "Word Ladder",
        description: "Transform one word to another by changing one letter at a time.",
        difficulty: "Hard",
        solved: false,
    },
];

const CodingTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Coding Practice</h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                <option>All Difficulties</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {codingProblems.map((problem) => (
                <div key={problem.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{problem.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">{problem.description}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {problem.solved ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                                <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
                            )}
                            <span className={problem.solved ? 'text-green-600' : 'text-gray-500'}>
                                {problem.solved ? 'Solved' : 'Not attempted'}
                            </span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            {problem.solved ? 'View Solution' : 'Solve'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default CodingTab;
