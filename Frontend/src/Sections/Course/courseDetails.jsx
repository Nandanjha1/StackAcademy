import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../../data/courses";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Find course by ID
  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-500">Course Not Found</h1>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-20">
      {/* Breadcrumb */}
      <div className="mb-6 text-gray-500 text-sm">
        <span
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/courses")}
        >
          Courses
        </span>{" "}
        / <span className="font-medium text-gray-800">{course.title}</span>
      </div>

      {/* Course Image */}
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-72 object-cover rounded-lg shadow-md"
      />

      {/* Title & Instructor */}
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-2">👨‍🏫 {course.instructor}</p>
        </div>
        <span className="text-2xl font-semibold text-green-500">
          {course.price}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center mt-4">
        <span className="text-yellow-500 text-lg">⭐ {course.rating || "4.5"}</span>
        <span className="ml-2 text-gray-500">({course.reviews?.length || 120} reviews)</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mt-6 leading-relaxed">{course.description}</p>

      {/* What you’ll learn */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">📌 What you'll learn</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {course.highlights?.map((point, index) => (
            <li key={index}>{point}</li>
          )) || (
            <>
              <li>Understand fundamentals of {course.title}</li>
              <li>Hands-on projects and assignments</li>
              <li>Industry best practices</li>
              <li>Access to resources & community support</li>
            </>
          )}
        </ul>
      </div>

      {/* Duration & Category */}
      <div className="flex justify-between items-center mt-6 text-gray-700">
        <span>⏱️ {course.duration}</span>
        <div className="flex space-x-2">
          {course.categories?.map((cat, i) => (
            <span
              key={i}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              #{cat}
            </span>
          )) || <span className="bg-gray-100 px-3 py-1 rounded-full">#General</span>}
        </div>
      </div>

      {/* Enroll Button */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => alert("Enroll feature coming soon!")}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all"
        >
          🚀 Enroll Now
        </button>
      </div>

      {/* Related Courses */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🔗 Related Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses
            .filter((c) => c.id !== course.id)
            .slice(0, 2)
            .map((related) => (
              <div
                key={related.id}
                className="p-4 border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                onClick={() => navigate(`/courses/${related.id}`)}
              >
                <img
                  src={related.imageUrl}
                  alt={related.title}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-3">{related.title}</h3>
                <p className="text-sm text-gray-500">{related.instructor}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
