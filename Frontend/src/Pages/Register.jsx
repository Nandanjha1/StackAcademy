import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(
                    "http://localhost:4000/api/v1/user/student/register",
                    { firstName, lastName, email, phone, course, dob, gender, password },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                )
                .then((res) => {
                    toast.success(res.data.message);
                    setIsAuthenticated(true);
                    navigateTo("/");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setCourse("");
                    setDob("");
                    setGender("");
                    setPassword("");
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    const images = [
        "/images/header3.jpg"
    ];

    return (
        <>
            <div className="relative w-full bg-cover bg-center min-h-screen flex items-center justify-center bg-gray-100 mt-10 p-4"
                style={{
                    backgroundImage: `url(${images})`,
                }}>
                <div className="w-full max-w-xl bg-transparent p-8 rounded-lg shadow-2xl">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Sign Up</h2>
                    <p className="text-center text-white mb-4">Please Sign Up To Continue</p>
                    <p className="text-center text-white mb-8 leading-relaxed">
                        "Welcome to StackAcademy – Please complete the form below to register
                        for your journey in tech world."
                    </p>
                    <form onSubmit={handleRegistration} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Course Name"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                            <input
                                type="date"
                                placeholder="Date of Birth"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end items-center gap-2 text-sm">
                            <p className="text-gray-100">Already Registered?</p>
                            <Link
                                to={"/login"}
                                className="text-blue-800 hover:underline font-medium"
                            >
                                Login Now
                            </Link>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;