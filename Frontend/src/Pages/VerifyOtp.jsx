import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "/src/main.jsx";
import { useNavigate, Navigate } from "react-router-dom";

// Accept setUser as a prop from the Login component
const VerifyOtp = ({ email, setUser }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [otp, setOtp] = useState("");
    const navigateTo = useNavigate();

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "/api/v1/auth/admin/verify-otp",
                { email, otp },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success(data.message);
            setIsAuthenticated(true);
            
            // --- KEY IMPROVEMENT ---
            // Set the user object in the global context
            setUser(data.user);

            navigateTo("/admin"); // Redirect to the admin dashboard
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/admin"} />;
    }

    return (
        <div
            className="relative h-screen w-full bg-cover bg-center min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url(/images/header3.jpg)`,
            }}
        >
            <div className="w-full max-w-lg bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-white mb-2">Admin Verification</h2>
                <p className="text-center text-white mb-6">
                    An OTP has been sent to your registered mobile number.
                </p>
                <form onSubmit={handleOtpVerification} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Enter 6-Digit OTP"
                        maxLength="6"
                        className="w-full p-3 border bg-transparent text-white placeholder-gray-300 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                        >
                            Verify & Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;