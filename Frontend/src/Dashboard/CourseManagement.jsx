import React, { useState, useEffect } from "react";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [courseData, setCourseData] = useState({
        _id: "",
        title: "",
        description: "",
        price: 0,
        duration: "",
    });

    // Function to fetch all courses from the backend
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/v1/course/all", { withCredentials: true });
            setCourses(data.courses);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch courses.");
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    // Handle form submission for adding or updating a course
    const handleAddOrUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const { _id, ...updatedData } = courseData;
                await axios.put(`/api/v1/course/update/${_id}`, updatedData, { withCredentials: true });
                toast.success("Course updated successfully!");
            } else {
                await axios.post("/api/v1/course/add", courseData, { withCredentials: true });
                toast.success("Course added successfully!");
            }

            setShowModal(false);
            resetForm();
            fetchCourses();
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} course.`);
        }
    };

    // Handle course deletion
    const handleDeleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await axios.delete(`/api/v1/course/delete/${id}`, { withCredentials: true });
                toast.success("Course deleted successfully!");
                fetchCourses();
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete course.");
            }
        }
    };

    // Reset form state
    const resetForm = () => {
        setCourseData({ _id: "", title: "", description: "", price: 0, duration: "" });
        setIsEditing(false);
    };

    // Open modal for adding a new course
    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    // Open modal for editing an existing course
    const openEditModal = (course) => {
        setCourseData(course);
        setIsEditing(true);
        setShowModal(true);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading Courses...</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-stack-dark min-h-screen">
            <Navbar />
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-100">Manage Courses</h2>
                    <button onClick={openAddModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center shadow">
                        <Plus className="h-4 w-4 mr-2" /> Add New Course
                    </button>
                </div>

                {/* Courses List */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course._id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                                <div>
                                    <h4 className="font-bold text-gray-800">{course.title}</h4>
                                    <p className="text-sm text-gray-600">{course.description}</p>
                                    <div className="text-xs text-gray-500 mt-1">Price: ₹{course.price} | Duration: {course.duration}</div>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => openEditModal(course)} className="text-blue-600 hover:text-blue-800 transition"><Edit className="h-5 w-5" /></button>
                                    <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 hover:text-red-800 transition"><Trash2 className="h-5 w-5" /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 p-8">No courses available. Add one to get started!</div>
                    )}
                </div>
            </div>

            {/* Add/Edit Course Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">{isEditing ? "Update Course" : "Add New Course"}</h3>
                            <button onClick={() => { setShowModal(false); resetForm(); }}><X className="h-6 w-6 text-gray-600 hover:text-red-500" /></button>
                        </div>
                        <form onSubmit={handleAddOrUpdateCourse} className="space-y-4">
                            <input name="title" value={courseData.title} onChange={handleInputChange} placeholder="Course Title" required className="w-full p-3 border rounded-lg" />
                            <textarea name="description" value={courseData.description} onChange={handleInputChange} placeholder="Course Description" required className="w-full p-3 border rounded-lg h-24" />
                            <input name="price" type="number" value={courseData.price} onChange={handleInputChange} placeholder="Price (₹)" required className="w-full p-3 border rounded-lg" />
                            <input name="duration" value={courseData.duration} onChange={handleInputChange} placeholder="Duration (e.g., 6 weeks)" required className="w-full p-3 border rounded-lg" />
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition">
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