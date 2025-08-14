import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courses from '../../data/courses';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Find course by ID
  const course = courses.find(c => c.id === parseInt(courseId));

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-500">Course Not Found</h1>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-20">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />
      <h1 className="text-4xl font-bold mt-6">{course.title}</h1>
      <p className="text-gray-600 mt-4">{course.description}</p>

      <div className="flex justify-between items-center mt-6 text-gray-700">
        <span>⏱️ {course.duration}</span>
        <span>👨‍🏫 {course.instructor}</span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-2xl font-semibold text-green-500">{course.price}</span>
        <button
          onClick={() => alert('Enroll feature coming soon!')}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-2 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
