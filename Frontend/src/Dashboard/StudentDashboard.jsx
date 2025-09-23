import React, { useState } from 'react';
import Home from './Home';

// In a real app, this data would come from an API
const userData = {
    enrolledCourses: [
        { id: 1, title: "React Basics", progress: 75 },
        { id: 2, title: "Node.js Fundamentals", progress: 40 },
        { id: 3, title: "Data Structures", progress: 10 },
    ],
    completedQuizzes: [1, 2],
    solvedProblems: [1, 2, 3],
    studyHours: 12,
    recentActivities: [
        { type: "quiz", title: "Completed React Components Quiz", time: "2 hours ago" },
        { type: "course", title: "Started Node.js Backend Development", time: "1 day ago" },
    ],
};

const StudentDashboard = () => {
    const [user, setUser] = useState(userData);

    // In a real app, you would fetch data here
    // useEffect(() => {
    //   fetchUserData().then(data => setUser(data));
    // }, []);

    return (
        <div className="p-8">
            <Home user={user} />
        </div>
    );
};

export default StudentDashboard;
