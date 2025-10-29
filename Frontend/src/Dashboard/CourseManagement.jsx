import React, { useState, useEffect } from "react";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import localCourses from "../data/courses";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseData, setCourseData] = useState({
    _id: "",
    title: "",
    description: "",
    price: 0,
    duration: "",
  });

  const fetchCourses = () => {
    setCourses(localCourses);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // ✅ Add or update locally (no backend)
  const handleAddOrUpdateCourse = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCourses((prev) =>
        prev.map((c) => (c._id === courseData._id ? courseData : c))
      );
      toast.success("Course updated successfully!");
    } else {
      const newCourse = { ...courseData, _id: Date.now() }; // temporary ID
      setCourses((prev) => [...prev, newCourse]);
      toast.success("Course added successfully!");
    }
    setShowModal(false);
    resetForm();
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c._id !== id));
      toast.success("Course deleted successfully!");
    }
  };

  const resetForm = () => {
    setCourseData({ _id: "", title: "", description: "", price: 0, duration: "" });
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setCourseData(course);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-stack-dark min-h-screen">
      <Navbar />
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-100">Manage Courses</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center shadow"
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Course
          </button>
        </div>

        <div className="bg-purple-500 rounded-xl shadow-lg p-6 space-y-4">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg bg-gray-50"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{course.title}</h4>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Price: ₹{course.price} | Duration: {course.duration}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(course)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 p-8">
              No courses available. Add one to get started!
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Update Course" : "Add New Course"}
              </h3>
              <button onClick={() => { setShowModal(false); resetForm(); }}>
                <X className="h-6 w-6 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <form onSubmit={handleAddOrUpdateCourse} className="space-y-4">
              <input
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                placeholder="Course Title"
                required
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                placeholder="Course Description"
                required
                className="w-full p-3 border rounded-lg h-24"
              />
              <input
                name="price"
                type="number"
                value={courseData.price}
                onChange={handleInputChange}
                placeholder="Price (₹)"
                required
                className="w-full p-3 border rounded-lg"
              />
              <input
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                placeholder="Duration (e.g., 6 weeks)"
                required
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
              >
                {isEditing ? "Update Course" : "Save Course"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
