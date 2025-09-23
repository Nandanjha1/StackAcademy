import React, { useState } from "react";

const QuizModal = ({ activeQuiz, setActiveQuiz }) => {
    const [quizStep, setQuizStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizScore, setQuizScore] = useState(0);

    // Ensure questions exist before rendering
    const quizQuestions = activeQuiz?.details?.questions || [];

    const handleNext = () => {
        // Check the answer
        if (quizAnswers[quizStep] === quizQuestions[quizStep].answer) {
            setQuizScore(prevScore => prevScore + 1);
        }
        setQuizStep(quizStep + 1);
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4">Quiz: {activeQuiz?.title}</h2>
                {quizStep < quizQuestions.length ? (
                    <div>
                        <p className="mb-4 font-semibold">{quizQuestions[quizStep].question}</p>
                        <div className="space-y-2 mb-4">
                            {quizQuestions[quizStep].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    className={`block w-full text-left px-4 py-2 rounded-lg border ${quizAnswers[quizStep] === idx ? 'bg-blue-100 border-blue-500' : 'border-gray-200'} hover:bg-blue-50`}
                                    onClick={() => setQuizAnswers({ ...quizAnswers, [quizStep]: idx })}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={handleNext}
                            disabled={quizAnswers[quizStep] === undefined}
                        >
                            Next
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4 font-semibold">Quiz Complete!</p>
                        <p className="mb-4 text-2xl font-bold text-center">Your Score: {quizScore} / {quizQuestions.length}</p>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => {
                                setActiveQuiz(null);
                                setQuizStep(0);
                                setQuizAnswers({});
                            }}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
