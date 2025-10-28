import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import Footer from "@/Sections/Footer";

const Dashboard = () => (
    <>
    <div className="container mx-auto px-4 py-6">
        <Navbar />
        <Sidebar />
    </div>
        <Footer />
    </>
);

export default Dashboard;
