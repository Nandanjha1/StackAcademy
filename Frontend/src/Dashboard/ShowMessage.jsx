import React, { useState, useEffect } from 'react';

const ShowMessage = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Fetch messages
    useEffect(() => {
        const fetchMessageFromAPI = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/v1/message/getall", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                setMessages(data?.messages || []);
            } catch (err) {
                console.error("Failed to fetch message:", err);
                setError(`Failed to load messages: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessageFromAPI();
    }, []);

    // 🔹 Toggle Read/Unread Status
    const toggleReadStatus = async (id, currentStatus) => {
        try {
            const response = await fetch(`/api/v1/message/markreadtoggle/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ isRead: !currentStatus }),
            });

            if (!response.ok) throw new Error("Failed to update message status");

            // Update state locally
            setMessages((prev) =>
                prev.map((msg) =>
                    msg._id === id ? { ...msg, isRead: !currentStatus } : msg
                )
            );
        } catch (err) {
            console.error("Error updating read status:", err);
            alert("Something went wrong while updating message status.");
        }
    };

    // 🔸 Loading
    if (isLoading) {
        return (
            <div className="max-w-md mx-auto p-6 mt-10 rounded-lg shadow-xl bg-yellow-50 border-l-4 border-yellow-500 flex items-center justify-center space-x-3">
                <svg className="animate-spin h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-yellow-800">Fetching messages from database...</p>
            </div>
        );
    }

    // 🔸 Error
    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 mt-10 rounded-lg shadow-xl bg-red-100 border-l-4 border-red-600">
                <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    // 🔸 No messages
    if (!messages.length) {
        return (
            <div className="max-w-md mx-auto p-6 mt-10 rounded-lg shadow-xl bg-gray-100 border-l-4 border-gray-400">
                <p className="text-lg text-gray-700">No messages found in the database.</p>
            </div>
        );
    }

    // 🔸 Render messages
    return (
        <div className="flex flex-wrap gap-6 p-8 justify-center">
            {messages.map((msg) => (
                <div
                    key={msg._id}
                    className={`p-6 w-80 rounded-xl shadow-2xl transition-all duration-300 ${
                        msg.isRead ? "bg-gray-200 border-l-8 border-green-600" : "bg-purple-500 border-l-8 border-blue-600"
                    }`}
                >
                    <header className="pb-3 border-b border-gray-300 mb-4">
                        <h1 className="text-xl font-bold text-gray-900">Received By:</h1>
                        <p>{msg.firstName} {msg.lastName || "No Name"}</p>
                        <p>{msg.email}</p>
                        <p>{msg.phone}</p>
                        <span className="text-sm text-gray-700 mt-1 block">
                            {msg.createdAt
                                ? new Date(msg.createdAt).toLocaleString()
                                : "Unknown Time"}
                        </span>
                    </header>

                    <div className="leading-relaxed mb-4">
                        <p>{msg.message || "Message content is empty."}</p>
                    </div>

                    <button
                        onClick={() => toggleReadStatus(msg._id, msg.isRead)}
                        className={`${
                            msg.isRead
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-blue-600 hover:bg-blue-700"
                        } text-white px-4 py-2 rounded-lg shadow-md transition-all`}
                    >
                        {msg.isRead ? "Mark as Unread" : "Mark as Read"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ShowMessage;
