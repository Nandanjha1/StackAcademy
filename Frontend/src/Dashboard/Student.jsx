import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

const Dashboard = () => (
    <div className="container mx-auto px-4 py-6">
        <Navbar />
        <Sidebar />
    </div>
);

export default Dashboard;
