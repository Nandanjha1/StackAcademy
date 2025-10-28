import React, { useState, useEffect } from 'react';

const ShowMessage = () => {
    // 1. State to manage the message data and loading status
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // The API endpoint we're targeting
    const API_ENDPOINT = "/api/v1/message/getall";

    // 2. useEffect hook to handle the real data fetching
    useEffect(() => {
        const fetchMessageFromAPI = async () => {
            setIsLoading(true);
            setError(null);
            setMessage(null);

            try {
                // Perform the actual network request
                const response = await fetch(API_ENDPOINT, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // You might need an Authorization header here for protected APIs
                        // 'Authorization': `Bearer ${yourAuthToken}`
                    },
                });

                // Check for HTTP errors (e.g., 404, 500)
                if (!response.ok) {
                    // Throw an error with the status text
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON data from the response body
                const data = await response.json();

                // Assuming the API returns an array of messages and we just want the first one
                if (data && data.length > 0) {
                    // Update the state with the first message found
                    setMessage(data[0]);
                } else {
                    // Handle the case where the fetch succeeds but the array is empty
                    setMessage(null);
                }

            } catch (err) {
                // Catch network errors (e.g., failed to connect) or the HTTP error thrown above
                console.error("Failed to fetch message from API:", err);
                setError(`Failed to load message: ${err.message}`);
                setMessage(null);
            } finally {
                // Stop loading regardless of success or failure
                setIsLoading(false);
            }
        };

        fetchMessageFromAPI();
    }, []); // Empty dependency array ensures this runs only once on mount

    // 3. Conditional Rendering Logic (Tailwind CSS)

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

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 mt-10 rounded-lg shadow-xl bg-red-100 border-l-4 border-red-600">
                <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (!message) {
        return (
            <div className="max-w-md mx-auto p-6 mt-10 rounded-lg shadow-xl bg-gray-100 border-l-4 border-gray-400">
                <p className="text-lg text-gray-700">No messages found in the database.</p>
            </div>
        );
    }

    // 4. Final Interface Rendering
    return (
        <div className="max-w-md mx-auto p-6 mt-10 rounded-xl shadow-2xl bg-white border-l-8 border-blue-600 transition-all duration-300 hover:shadow-3xl">
            <header className="pb-3 border-b border-gray-200 mb-4">
                <h1 className="text-2xl font-extrabold text-gray-800">{message.title || "No Title"}</h1>
                <span className="text-sm text-gray-500 mt-1 block">
                    {/* Display timestamp if available, otherwise show a default */}
                    Received: {message.timestamp ? new Date(message.timestamp).toLocaleString() : 'Unknown Time'}
                </span>
            </header>

            <div className="text-gray-700 leading-relaxed mb-6">
                <p>{message.content || "Message content is empty."}</p>
            </div>

            <footer className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150"
                    onClick={() => console.log(`Message ${message.id} acknowledged`)}
                >
                    Acknowledge
                </button>
            </footer>
        </div>
    );
};

export default ShowMessage;