import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main"; // Assuming your context is exported from 'main'
import { Link, Navigate, useNavigate } from "react-router-dom";

const StudentRegister = () => {
    // Assuming the context is set up to provide these values
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "/api/v1/auth/student/register",
                // Only sending the fields required by the backend
                { firstName, lastName, email, phone, password },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success(data.message);
            setIsAuthenticated(true);
            navigateTo("/");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setPassword("");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/student"} />;
    }

    return (
        <>
            <div
                className="relative w-full bg-cover bg-center min-h-screen flex items-center justify-center bg-gray-100 p-4"
                style={{
                    backgroundImage: `url(/images/header3.jpg)`, // Using the image path from your code
                }}
            >
                <div className="w-full max-w-xl bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Sign Up</h2>
                    <p className="text-center text-white mb-4">Create Your Student Account</p>
                    <p className="text-center text-white mb-8 leading-relaxed">
                        "Welcome to StackAcademy – Join our community and start your journey in the tech world."
                    </p>
                    <form onSubmit={handleRegistration} className="space-y-6" autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                className="p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <div className="flex justify-end items-center gap-2 text-sm">
                            <p className="text-gray-300">Already Registered?</p>
                            <Link
                                to={"/login"}
                                className="text-blue-400 hover:underline font-medium"
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

export default StudentRegister;
