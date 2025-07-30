import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(
                    "http://localhost:4000/api/v1/user/login",
                    { email, password, confirmPassword, role: "Student" },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                )
                .then((res) => {
                    toast.success(res.data.message);
                    setIsAuthenticated(true);
                    navigateTo("/");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
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
            <div className="relative h-screen w-full bg-cover bg-center min-h-screen flex items-center justify-center mt-10 p-4"
                style={{
                    backgroundImage: `url(${images})`,
                }}>
                <div className="w-full max-w-lg p-8 bg-transparent rounded-lg shadow-2xl">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Sign In</h2>
                    <p className="text-center text-white mb-4">Please Login To Continue</p>
                    <p className="text-center text-white mb-8 leading-relaxed">
                        "Login to StackAcademy – Access your personalized dashboard and
                        continue your tech journey."
                    </p>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full bg-transparent p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="flex justify-end items-center gap-2 text-sm">
                            <p className="text-gray-100">Not Registered?</p>
                            <Link
                                to={"/register"}
                                className="text-blue-700 hover:underline font-medium"
                            >
                                Register Now
                            </Link>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;