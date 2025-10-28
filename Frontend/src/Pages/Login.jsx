import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "@/main.jsx";
import { Link, Navigate } from "react-router-dom";
import VerifyOtp from "@/Pages/VerifyOtp.jsx";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/auth/login", { email, password }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            if (data.message.includes("OTP sent")) {
                toast.success(data.message);
                setShowOtpForm(true); // Just show the OTP form, no navigation
            } else {
                toast.success(data.message);
                setIsAuthenticated(true);
                setUser(data.user); // Set the user, the component will handle the redirect on re-render
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    // --- THIS IS THE KEY: DECLARATIVE REDIRECTION ---
    // This logic runs AFTER the state has been successfully updated and the component re-renders.
    if (isAuthenticated) {
        if (user.role === "Admin") {
            return <Navigate to="/admin" />;
        }
        if (user.role === "Mentor") {
            return <Navigate to="/mentor" />;
        }
        // Default to student dashboard
        return <Navigate to="/student" />;
    }

    // If OTP form needs to be shown, render it.
    if (showOtpForm) {
        // Pass email and the state setters to the OTP component
        return <VerifyOtp email={email} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />;
    }

    // Default view: The Login Form
    return (
        <div className="relative h-screen w-full bg-cover bg-center flex items-center justify-center p-4" style={{ backgroundImage: `url(/images/header3.jpg)` }}>
            <div className="w-full max-w-lg bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-white mb-2">Sign In</h2>
                {/* ... rest of your JSX for the form ... */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <input type="email" placeholder="Email" className="w-full p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="flex justify-end items-center gap-2 text-sm">
                        <p className="text-gray-300">Not Registered?</p>
                        <Link to={"/register"} className="text-blue-400 hover:underline font-medium">Register Now</Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">Login</button>
                    </div>
                </form>
                <div>
                    <button className="flex items-center justify-center w-full mt-2 px-6 py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition border" onClick={()=>window.open("/api/v1/auth/google", "_self")}>
                        <img src="/public/images/Google_favicon.svg" alt="Google icon" className="w-4 h-4 mr-2" />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
