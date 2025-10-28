import React, { useState, useEffect, useContext } from "react";
import { Plus, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main.jsx";
import Navbar from "./Navbar";

const AdminPanel = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    // State for dashboard data
    const [stats, setStats] = useState({ studentCount: 0, mentorCount: 0, courseCount: 0, totalRevenue: 0, totalMessage: 0 });
    const [lists, setLists] = useState({ mentors: [], recentActivity: [] });
    const [loading, setLoading] = useState(true);

    // State for the "Add Mentor" modal
    const [showModal, setShowModal] = useState(false);
    const [mentorData, setMentorData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "Mentor",
    });

    // Function to fetch data from the backend
    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get("/api/v1/user/admin/stats", { withCredentials: true });
            setStats(data.stats);
            setLists(data.lists);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch dashboard data.");
            setLoading(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleInputChange = (e) => {
        setMentorData({ ...mentorData, [e.target.name]: e.target.value });
    };

    // Handle the submission of the "Add Mentor" form
    const handleAddMentor = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/user/admin/register", mentorData, { withCredentials: true });
            toast.success(data.message);
            setShowModal(false);
            fetchDashboardData();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add mentor.");
        }
    };

    if (loading) {
        return <div className="text-center p-10">Loading Admin Dashboard...</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-sky-400 min-h-screen">
            <Navbar />
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.firstName}!</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-blue-500 p-6 rounded-xl text-white shadow-lg"><h3 className="font-semibold">Total Students</h3><p className="text-3xl font-bold">{stats.studentCount}</p></div>
                    <div className="bg-green-500 p-6 rounded-xl text-white shadow-lg"><h3 className="font-semibold">Total Mentors</h3><p className="text-3xl font-bold">{stats.mentorCount}</p></div>

                    {/* Dynamic Course Card */}
                    <div
                        className="bg-purple-500 p-6 rounded-xl text-white shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => navigate("/admin/courses")}
                    >
                        <h3 className="font-semibold">Total Courses</h3>
                        <p className="text-3xl font-bold">{stats.courseCount}</p>
                    </div>

                    <div className="bg-orange-500 p-6 rounded-xl text-white shadow-lg"><h3 className="font-semibold">Total Revenue</h3><p className="text-3xl font-bold">₹{stats.totalRevenue}</p></div>

                    <div className="bg-indigo-800 p-6 rounded-xl text-white shadow-lg cursor-pointer transition-transform transform hover:scale-105" onClick={() => navigate("/admin/message")}>
                        <h3 className="font-semibold">Total Messages</h3>
                        <p className="text-3xl font-bold">{stats.totalMessage}</p>
                    </div>
                </div>

                {/* Manage Mentors Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Manage Mentors</h3>
                        <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center shadow">
                            <Plus className="h-4 w-4 mr-2" /> Add Mentor
                        </button>
                    </div>
                    <div className="space-y-3">
                        {lists.mentors.map((mentor) => (
                            <div key={mentor._id} className="flex justify-between items-center p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">{mentor.firstName.charAt(0)}{mentor.lastName.charAt(0)}</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{mentor.firstName} {mentor.lastName}</h4>
                                        <p className="text-sm text-gray-500">{mentor.email}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2"><button className="text-blue-600 hover:underline">Edit</button><button className="text-red-600 hover:underline">Remove</button></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {lists.recentActivity.map((activity) => (
                            <div key={activity._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <User className={`h-6 w-6 ${activity.role === 'Student' ? 'text-blue-500' : activity.role === 'Mentor' ? 'text-green-500' : 'text-purple-500'}`} />
                                    <div>
                                        <p className="font-medium text-gray-800">New {activity.role.toLowerCase()} registration</p>
                                        <p className="text-sm text-gray-500">{activity.firstName} {activity.lastName}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Mentor Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Add New Mentor</h3>
                            <button onClick={() => setShowModal(false)}><X className="h-6 w-6 text-gray-600 hover:text-red-500" /></button>
                        </div>
                        <form onSubmit={handleAddMentor} className="space-y-4">
                            <input name="firstName" value={mentorData.firstName} onChange={handleInputChange} placeholder="First Name" required className="w-full p-3 border rounded-lg" />
                            <input name="lastName" value={mentorData.lastName} onChange={handleInputChange} placeholder="Last Name" required className="w-full p-3 border rounded-lg" />
                            <input name="email" type="email" value={mentorData.email} onChange={handleInputChange} placeholder="Email Address" required className="w-full p-3 border rounded-lg" />
                            <input name="phone" type="tel" value={mentorData.phone} onChange={handleInputChange} placeholder="Phone Number" required className="w-full p-3 border rounded-lg" />
                            <input name="password" type="password" value={mentorData.password} onChange={handleInputChange} placeholder="Password" required className="w-full p-3 border rounded-lg" />
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition">Save Mentor</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
