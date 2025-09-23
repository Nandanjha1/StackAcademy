import React, { useState } from 'react';
import QuizzesTab from './QuizzesTab';
import QuizModal from './QuizeModel';
import allQuizzes from './allQuizzes';

const Quizzes = () => {
    const [activeQuiz, setActiveQuiz] = useState(null);

    const handleQuizSelect = (quizId) => {
        const selectedQuiz = allQuizzes.find(quiz => quiz.id === quizId);
        setActiveQuiz(selectedQuiz);
    };

    return (
        <div className="p-8">
            {/* Conditional Rendering: show the modal if a quiz is active, otherwise show the list */}
            {activeQuiz ? (
                <QuizModal
                    activeQuiz={activeQuiz}
                    setActiveQuiz={setActiveQuiz}
                />
            ) : (
                <QuizzesTab
                    quizzes={allQuizzes}
                    onQuizSelect={handleQuizSelect}
                />
            )}
        </div>
    );
};

export default Quizzes;